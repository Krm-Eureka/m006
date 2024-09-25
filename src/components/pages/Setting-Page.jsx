import { useEffect, useState } from "react";
import HeaderLayout from "../Header-component";
import Swal from "sweetalert2";
import { formatDate } from "../../services/formatTimeStamp";
import CardSetting from "../card-setting";
import {
  GetMasterSetting,
  PutDMCSetting,
} from "../../services/api-service/parameterSetting";

const MasterSetting = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modify, setModify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [masterData, setMasterData] = useState({
    plmReference: "",
    ebomReference: "",
    manufacturingDate: "",
    eoltRefCode: "",
    serialNumber: "",
  });

  const correctPassword = "123456";
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await GetMasterSetting("1", "1", setMasterData, setLoading);
        setMasterData(data);
      } catch (error) {
        setError(error.message);
        Toast.fire({
          icon: "error",
          title: "Failed to fetch data.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      Toast.fire({
        icon: "error",
        title: "Incorrect password. Please try again.",
      });
    }
  };

  const handleModify = () => {
    setModify((prev) => !prev);
  };

  const handleDMCUpdate = async () => {
    const { plmReference, ebomReference, manufacturingDate, eoltRefCode, serialNumber } = masterData;

    if (plmReference && ebomReference && manufacturingDate && eoltRefCode && serialNumber) {
      const data = {
        PLM_Reference: plmReference,
        EBOM_Reference: ebomReference,
        manufacturingDate,
        EOLT_Reference: eoltRefCode,
        serialNumber,
      };

      try {
        await PutDMCSetting('1', '1', data);
        Toast.fire({
          icon: "success",
          title: "DMC settings updated successfully!",
        });
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: "Failed to update DMC settings.",
        });
      }
    } else {
      Toast.fire({
        icon: "warning",
        title: "Please fill in all required fields.",
      });
    }
  };


  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-200 p-6 rounded-md shadow-lg">
          <h1 className="text-xl font-semibold text-gray-700 mb-4">
            Enter Password
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              className="w-full p-2 mb-4 border rounded-lg text-gray-700"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  } else if (isAuthenticated) {
    return (
      <>
        <HeaderLayout page="Setting Parameter" />
      <div className="flex flex-wrap bg-gray-300 m-4 p-2 rounded-md w-90% h-fit">
        <div className="flex justify-between">
          <div className="card-content bg-gray-200 m-2 rounded-md w-96 h-fit">
            <div className="title bg-green-500 p-2 rounded-t-md font-bold text-gray-700">
              <p>DMC CODE CONTENT</p>
            </div>
            <div className="content px-8 py-2 items-center min-w-96">
              <div className="flex flex-between flex-wrap justify-start">
                {["PLM Reference", "EBOM Reference", "Manufacturing Date", "EOLT Reference A/B", "Serial Number"].map((label, index) => (
                  <div className="mr-4 mb-2" key={index}>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      {label} <span className="text-red-600">*</span>
                    </label>
                    <input
                      disabled={!modify}
                      required
                      type={label === "Manufacturing Date" ? "date" : "text"}
                      id={label.replace(/ /g, "_")}
                      value={masterData[label.toLowerCase().replace(/ /g, "")] || ""}
                      className="w-32 p-2.5 mr-3 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={`${label}...`}
                      onChange={(e) => setMasterData({ ...masterData, [label.toLowerCase().replace(/ /g, "")]: e.target.value })}
                    />
                  </div>
                ))}
              </div>
            </div>
              <div className="flex flex-col items-center text-center mb-4">
              <p className="text-xs pl-4 pb-4 font-bold">
                {masterData.plmReference && masterData.ebomReference && masterData.manufacturingDate && masterData.eoltRefCode && masterData.serialNumber
                  ? `Example : ${masterData.plmReference}-${masterData.ebomReference}-${formatDate(masterData.manufacturingDate)}-${masterData.eoltRefCode}-${masterData.serialNumber}`
                  : `Example : xxxxxxxxxx-yyyyyyyyyy-DDMMYY-S-*****`}
              </p>
                <button
                  onClick={handleDMCUpdate}
                  disabled={!modify}
                  className={`mx-4 bg-green-500 hover:bg-green-700 text-gray-900 hover:text-white font-semibold py-2 px-4 border rounded-lg ${
                    !modify ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  UPDATE DMC
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
            <div className="flex flex-between flex-wrap justify-start">
              {["current", "sensitivity", "thd", "Frequency"].map((title) => (
                <CardSetting
                  key={title}
                  disable={!modify}
                  title={title}
                  minValue={masterData[`minLimit${title.charAt(0).toUpperCase() + title.slice(1)}`] || ""}
                  maxValue={masterData[`maxLimit${title.charAt(0).toUpperCase() + title.slice(1)}`] || ""}
                  setMinValue={(value) => setMasterData({ ...masterData, [`minLimit${title.charAt(0).toUpperCase() + title.slice(1)}`]: value })}
                  setMaxValue={(value) => setMasterData({ ...masterData, [`maxLimit${title.charAt(0).toUpperCase() + title.slice(1)}`]: value })}
                />
              ))}
            </div>
              <div>
                <button
                  disabled={!modify}
                  className={`mx-4 bg-green-500 hover:bg-green-700 text-gray-900 hover:text-white font-semibold py-2 px-4 border rounded-lg ${
                    !modify ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  UPDATE PARAMETER
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="items-center">
          <button
            onClick={handleModify}
            className={`mx-4 ${modify ? "bg-red-500" : "bg-blue-500"} hover:${
              modify ? "bg-red-700" : "bg-blue-700"
            } text-gray-900 hover:text-white font-semibold py-2 px-4 border rounded-lg`}
          >
            {modify ? "CANCEL" : "Modify"}
          </button>
        </div>
      </>
    );
  }
};

export default MasterSetting;

import { useEffect, useState } from "react";
import HeaderLayout from "../Header-component";
import Swal from "sweetalert2";
import { formatDate } from "../../services/formatTimeStamp";
import CardSetting from "../card-setting";
import {
  GetMasterSetting,
  PutDMCSetting,
  PutParameterSetting,
} from "../../services/api-service/parameterSetting";
import Loading from "../loadingComponent";

const MasterSetting = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modify, setModify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [minLimitCurrent, setMinLimitCurrent] = useState("");
  const [maxLimitCurrent, setMaxLimitCurrent] = useState("");
  const [minLimitSensitivity, setMinLimitSensitivity] = useState("");
  const [maxLimitSensitivity, setMaxLimitSensitivity] = useState("");
  const [minLimitTHD, setMinLimitTHD] = useState("");
  const [maxLimitTHD, setMaxLimitTHD] = useState("");
  const [minLimitFrequency, setMinLimitFrequency] = useState("");
  const [maxLimitFrequency, setMaxLimitFrequency] = useState("");
  const [masterData, setMasterData] = useState({
    plmReference: "",
    ebomReference: "",
    manufacturingDateFormat: "",
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
      setLoading(true);
      try {
        await GetMasterSetting("1", "1", setMasterData, setLoading);
      } catch (error) {
        setError(error.message);
      }
       finally {
        setLoading(false);
      }
      //   const intervalId = setInterval(fetchData, 2000);
      // return () => clearInterval(intervalId);
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
    const {
      plmReference,
      ebomReference,
      manufacturingDateFormat,
      eoltRefCode,
    } = masterData;
    if (
      plmReference &&
      ebomReference &&
      manufacturingDateFormat &&
      eoltRefCode
    ) {
      const data = {
        plmReference,
        ebomReference,
        manufacturingDateFormat,
        eoltRefCode,
      };
      try {
        await PutDMCSetting("1", "1", data);
        Toast.fire({
          icon: "success",
          title: "DMC settings updated successfully!",
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Failed to update DMC settings.",
          error,
        });
      }
    } else {
      Toast.fire({
        icon: "warning",
        title: "Please fill in all required DMC fields.",
      });
    }
  };
  const handleUpdateParam = async () => {
    const data = {
      runningMin: minLimitCurrent,
      runningMax: maxLimitCurrent,
    };
    if ((minLimitCurrent, maxLimitCurrent)) {
      try {
        await PutParameterSetting("1", "1", data);
        Toast.fire({
          icon: "success",
          title: "DMC settings updated successfully!",
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Failed to update DMC settings.",
          error,
        });
      }
    } else {
      Toast.fire({
        icon: "warning",
        title: "Please fill in all required Parameter fields.",
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
  }

  return (
    <>
      <HeaderLayout page="Setting Parameter" />
      <div className="items-center flex flex-col ">
        <div className="flex flex-wrap bg-gray-300 m-4 p-2 rounded-md w-90% h-fit">
          <div className="flex justify-between">
            <div className="card-content bg-gray-200 m-2 rounded-md w-96 h-fit">
              <div className="title bg-green-500 p-2 rounded-t-md font-bold text-gray-700">
                <p>DMC CODE CONTENT</p>
              </div>
              <div className="content px-8 py-2 items-center min-w-96">
                <div className="flex flex-wrap justify-start">
                  {[
                    {
                      label: "PLM Reference",
                      type: "text",
                      value: masterData.plmReference,
                      setter: (value) =>
                        setMasterData((prev) => ({
                          ...prev,
                          plmReference: value,
                        })),
                    },
                    {
                      label: "EBOM Reference",
                      type: "text",
                      value: masterData.ebomReference,
                      setter: (value) =>
                        setMasterData((prev) => ({
                          ...prev,
                          ebomReference: value,
                        })),
                    },
                    {
                      label: "Manufacturing Date",
                      type: "date",
                      value: masterData.manufacturingDateFormat,
                      setter: (value) =>
                        setMasterData((prev) => ({
                          ...prev,
                          manufacturingDateFormat: value,
                        })),
                    },
                    {
                      label: "EOLT Reference A/B",
                      type: "text",
                      value: masterData.eoltRefCode.toUpperCase(),
                      setter: (value) =>
                        setMasterData((prev) => ({
                          ...prev,
                          eoltRefCode: value.toUpperCase(),
                        })),
                    },
                    {
                      label: "Serial Number",
                      value: masterData.serialNumber,
                      setter: () => {},
                      disabled: true,
                    },
                  ].map(({ label, value, setter, type }) => (
                    <div className="mr-4 mb-2" key={label}>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        {label} <span className="text-red-600">*</span>
                      </label>
                      <input
                        disabled={!modify || label === "Serial Number"}
                        required={label !== "Serial Number"}
                        type={type}
                        // value={value}
                        value={loading ? "" : value}
                        className="w-32 p-2.5 mr-3 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder={label}
                        onChange={(e) => setter(e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center text-center mb-4">
                <p className="text-xs pl-4 pb-4 font-bold">
                  {masterData.plmReference &&
                  masterData.ebomReference &&
                  masterData.manufacturingDateFormat &&
                  masterData.eoltRefCode
                    ? // &&
                      // serialNumber
                      `Example : ${masterData.plmReference}-${
                        masterData.ebomReference
                      }-${formatDate(masterData.manufacturingDateFormat)}-${
                        masterData.eoltRefCode
                      }-*****`
                    : masterData.plmReference &&
                      masterData.ebomReference &&
                      masterData.manufacturingDateFormat &&
                      masterData.eoltRefCode
                    ? `Example : ${masterData.plmReference}-${
                        masterData.ebomReference
                      }-${formatDate(masterData.manufacturingDateFormat)}-${
                        masterData.eoltRefCode
                      }-*****`
                    : masterData.plmReference &&
                      masterData.ebomReference &&
                      masterData.manufacturingDateFormat
                    ? `Example : ${masterData.plmReference}-${
                        masterData.ebomReference
                      }-${formatDate(
                        masterData.manufacturingDateFormat
                      )}-S-*****`
                    : masterData.plmReference && masterData.ebomReference
                    ? `Example : ${masterData.plmReference}-${masterData.ebomReference}-DDMMYY-S-*****`
                    : masterData.plmReference
                    ? `Example : ${masterData.plmReference}-yyyyyyyyyy-DDMMYY-S-*****`
                    : `Example : xxxxxxxxxx-yyyyyyyyyy-DDMMYY-S-*****`}
                </p>
                {/* <p className="text-xs pl-4 pb-4 font-bold">
                  {PLM_Reference &&
                  EBOM_Reference &&
                  manufacturingDate &&
                  EOLT_Reference &&
                  serialNumber
                    ? `Example : ${PLM_Reference}-${EBOM_Reference}-${formatDate(
                        manufacturingDate
                      )}-${EOLT_Reference}-${serialNumber}`
                    : PLM_Reference &&
                      EBOM_Reference &&
                      manufacturingDate &&
                      EOLT_Reference
                    ? `Example : ${PLM_Reference}-${EBOM_Reference}-${formatDate(
                        manufacturingDate
                      )}-${EOLT_Reference}-*****`
                    : PLM_Reference && EBOM_Reference && manufacturingDate
                    ? `Example : ${PLM_Reference}-${EBOM_Reference}-${formatDate(
                        manufacturingDate
                      )}-S-*****`
                    : PLM_Reference && EBOM_Reference
                    ? `Example : ${PLM_Reference}-${EBOM_Reference}-DDMMYY-S-*****`
                    : PLM_Reference
                    ? `Example : ${PLM_Reference}-yyyyyyyyyy-DDMMYY-S-*****`
                    : `Example : xxxxxxxxxx-yyyyyyyyyy-DDMMYY-S-*****`}
                </p> */}
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
              <div className="flex flex-wrap justify-start">
                {[
                  {
                    id: 0,
                    title: "Current",
                    minValue: minLimitCurrent,
                    maxValue: maxLimitCurrent,
                    setMinValue: setMinLimitCurrent,
                    setMaxValue: setMaxLimitCurrent,
                  },
                  {
                    id: 1,
                    title: "Sensitivity",
                    minValue: minLimitSensitivity,
                    maxValue: maxLimitSensitivity,
                    setMinValue: setMinLimitSensitivity,
                    setMaxValue: setMaxLimitSensitivity,
                  },
                  {
                    id: 2,
                    title: "THD",
                    minValue: minLimitTHD,
                    maxValue: maxLimitTHD,
                    setMinValue: setMinLimitTHD,
                    setMaxValue: setMaxLimitTHD,
                  },
                  {
                    id: 3,
                    title: "Frequency",
                    minValue: minLimitFrequency,
                    maxValue: maxLimitFrequency,
                    setMinValue: setMinLimitFrequency,
                    setMaxValue: setMaxLimitFrequency,
                  },
                ].map((props) => (
                  <CardSetting key={props.id} disable={!modify} {...props} />
                ))}
              </div>
              <div>
                <button
                  disabled={!modify}
                  onClick={handleUpdateParam}
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
            className={`mx-4 ${
              modify
                ? "bg-red-500 hover:bg-red-700"
                : "bg-blue-500 hover:bg-blue-700"
            } text-gray-900 hover:text-white font-semibold py-2 px-4 border rounded-lg`}
          >
            {modify ? "CANCEL" : "Modify"}
          </button>
        </div>
      </div>
    </>
  );
};

export default MasterSetting;

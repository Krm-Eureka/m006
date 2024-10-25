import { useEffect, useState } from "react";
import HeaderLayout from "../Header-component";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  formatDateForSetting,
  formatDateToSetting,
  formatDate,
  yyMMdd,
} from "../../services/formatTimeStamp";
// import CardSetting from "../card-setting";
import {
  GetMasterSetting,
  PutSetting,
} from "../../services/api-service/parameterSetting";
import AuthLogin from "../../services/auth-sv";
import Loading from "../loadingComponent";

const MasterSetting = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modify, setModify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [minLimitCurrent, setMinLimitCurrent] = useState("");
  // const [maxLimitCurrent, setMaxLimitCurrent] = useState("");
  // const [productionLineName, setProductionLineName] = useState("");
  // const [minLimitSensitivity, setMinLimitSensitivity] = useState("");
  // const [maxLimitSensitivity, setMaxLimitSensitivity] = useState("");
  // const [minLimitTHD, setMinLimitTHD] = useState("");
  // const [maxLimitTHD, setMaxLimitTHD] = useState("");
  // const [minLimitFrequency, setMinLimitFrequency] = useState("");
  // const [maxLimitFrequency, setMaxLimitFrequency] = useState("");
  const [masterData, setMasterData] = useState({
    id: 0,
    productionLineName: "",
    manufacturingDateFormat: "",
    plmReference: "",
    ebomReference: "",
    lastRunningDate: "",
    eoltRefCode: "",
    runningNo: "",
    runningMin: "",
    runningMax: "",
    enableFlag: true,
  });

  // const correctPassword = "123456";
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
      } finally {
        setLoading(false);
      }
      //   const intervalId = setInterval(fetchData, 2000);
      // return () => clearInterval(intervalId);
    };

    fetchData();
  }, [isAuthenticated]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (password === correctPassword) {
  //     setIsAuthenticated(true);
  //   } else {
  //     Toast.fire({
  //       icon: "error",
  //       title: "Incorrect password. Please try again.",
  //     });
  //   }
  // };
  const handleSubmit = async (e) => {
    setIsAuthenticated(true);
    e.preventDefault();
    try {
      const { success, token, login_msg } = await AuthLogin(email, password);
      if (success) {
        localStorage.setItem("authToken", token);
        Toast.fire({
          icon: "success",
          title: `Authorization in ${login_msg}`,
        });
        setIsAuthenticated(true);
      } else {
        Toast.fire({
          icon: "error",
          title: "Authorization Fail",
        });
        // navigate("/Console/Content_ACT/AutoRun");
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      Toast.fire({
        icon: "error",
        title: "Authorization Fail",
      });
      // navigate("/Console/Content_ACT/AutoRun");
      setIsAuthenticated(true);
    }
  };

  const handleModify = async () => {
    setModify((prev) => !prev);
    try {
      await GetMasterSetting("1", "1", setMasterData, setLoading);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleParameterUpdate = async () => {
    const {
      id,
      ProductionLineName,
      plmReference,
      ebomReference,
      lastRunningDate,
      manufacturingDateFormat,
      eoltRefCode,
      runningNo,
      runningMin,
      runningMax,
      enableFlag,
    } = masterData;
    console.log("Current Values:");
    console.log("ID:", id);
    console.log("Production Line Name:", ProductionLineName);
    console.log("PLM Reference:", plmReference);
    console.log("EBOM Reference:", ebomReference);
    console.log("Manufacturing Date Format:", manufacturingDateFormat);
    console.log("Last Running Date:", lastRunningDate);
    console.log("EOLT Reference Code:", eoltRefCode);
    console.log("Running No:", runningNo);
    console.log("Running Min:", runningMin);
    console.log("Running Max:", runningMax);
    console.log("Enable Flag:", enableFlag);
    // console.log(lastRunningDate);
    // const date = new Date(manufacturingDateFormat);
    // const date = new Date(lastRunningDate);
    // const LastDate = date.toISOString();
    console.log(
      Boolean(
        plmReference &&
          ebomReference &&
          // manufacturingDateFormat &&
          lastRunningDate &&
          // LastDate &&
          eoltRefCode &&
          runningMin &&
          runningMax &&
          enableFlag
      )
    );

    if (
      (id,
      // ProductionLineName,
      plmReference &&
        ebomReference &&
        // manufacturingDateFormat &&
        lastRunningDate &&
        // LastDate &&
        eoltRefCode &&
        runningNo &&
        runningMin !== undefined &&
        runningMin !== null &&
        runningMax !== undefined &&
        runningMax !== null &&
        enableFlag)
    ) {
      const data = {
        id,
        ProductionLineName: "LINE A",
        plmReference,
        ebomReference,
        // manufacturingDateFormat: formatDateForSetting(LastDate),
        // lastRunningDate :formatDateToSetting(lastRunningDate),
        manufacturingDateFormat: "yyMMdd",
        eoltRefCode,
        runningNo,
        runningMin: parseInt(runningMin),
        runningMax: parseInt(runningMax),
        enableFlag,
      };
      try {
        console.log("Data to be sent:", data);
        await PutSetting("1", "1", data);
        Toast.fire({
          icon: "success",
          title: "DMC settings updated successfully!",
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Failed to update DMC settings.",
          text: error.message,
        });
      }
    } else {
      Toast.fire({
        icon: "warning",
        title: "Please fill in all required DMC fields.",
      });
    }
  };
  console.log(masterData.lastRunningDate);
  const tst = "2024-10-23T02:26:48.622Z";
  const lastRunDate = masterData.lastRunningDate
    ? tst.split("T")[0]
    : "2024-10-23T02:26:48.622Z";
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-200 p-6 rounded-md shadow-lg">
          <h1 className="text-xl font-semibold text-gray-700 mb-4">
            Authorization
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full p-2 mb-4 border rounded-lg text-gray-700"
              placeholder="email | userName"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
                    // {
                    //   label: "Last Running Date",
                    //   type: "date",
                    //   value: masterData.manufacturingDateFormat
                    //     ? masterData.manufacturingDateFormat
                    //     : "",
                    //   setter: (value) =>
                    //     setMasterData((prev) => ({
                    //       ...prev,
                    //       manufacturingDateFormat: value,
                    //     })),
                    // },
                    {
                      label: "Last Running Date",
                      type: "text",
                      value: yyMMdd(lastRunDate),
                      setter: (lastRunDate) =>
                        setMasterData((prev) => ({
                          ...prev,
                          lastRunningDate: lastRunDate,
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
                      value: masterData.runningNo
                        ? String(masterData.runningNo).padStart(5, "0")
                        : "",
                      setter: (value) =>
                        setMasterData((prev) => ({
                          ...prev,
                          runningNo: value,
                        })),
                    },
                  ].map(({ id, label, value, setter, type }) => (
                    <div className="mr-4 mb-2" key={id}>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        {label} <span className="text-red-600">*</span>
                      </label>
                      <input
                        disabled={
                          !modify ||
                          label === "Serial Number" ||
                          label === "Last Running Date"
                        }
                        required={label !== "Serial Number"}
                        type={type}
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
                  Example :{" "}
                  {masterData.plmReference
                    ? masterData.plmReference
                    : `xxxxxxxxx`}
                  -
                  {masterData.ebomReference
                    ? masterData.ebomReference
                    : `yyyyyyyyyy`}
                  -
                  {masterData.lastRunningDate
                    ? formatDateForSetting(masterData.lastRunningDate)
                    : `yyMMdd`}
                  -{masterData.eoltRefCode ? masterData.eoltRefCode : `T`}-
                  {masterData.runningNo
                    ? String(masterData.runningNo).padStart(5, "0")
                    : "00000"}
                </p>
              </div>
            </div>
            <div className="card-content bg-gray-200 m-2 rounded-md w-96 h-fit">
              <div className="title bg-green-500 p-2 rounded-t-md font-bold text-gray-700">
                <p>CURRENT SETTING</p>
              </div>
              <div className="content px-8 py-2 items-center min-w-96">
                <div className="flex flex-wrap justify-start">
                  {[
                    {
                      id: 0,
                      label: "Current Min",
                      value: masterData.runningMin,
                      type: "number",
                      
                      setter: (value) =>
                        setMasterData((prev) => ({
                          ...prev,
                          runningMin: parseFloat(value),
                        })),
                    },
                    {
                      id: 1,
                      label: "Current Max",
                      value: masterData.runningMax,
                      type: "number",
                      
                      setter: (value) =>
                        setMasterData((prev) => ({
                          ...prev,
                          runningMax: parseFloat(value),
                        })),
                    },
                  ].map(({ id, label, value, setter, type }) => (
                    <>
                      <div className="mr-4 mb-2" key={id}>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          {label} <span className="text-red-600">*</span>
                        </label>
                        <input
                          disabled={!modify || label === "Serial Number"}
                          required={label !== "Serial Number"}
                          type={type === "number" ? "number" : "text"}
                          step={0.1}
                          value={loading ? "" : value}
                          className="w-32 p-2.5 mr-3 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          placeholder={label}
                          onChange={(e) => setter(e.target.value)}
                        />
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="items-center">
          {modify ? (
            <>
              {" "}
              <button
                onClick={handleParameterUpdate}
                disabled={!modify}
                className={`mx-4 bg-green-500 hover:bg-green-700 text-gray-900 hover:text-white font-semibold py-2 px-4 border rounded-lg ${
                  !modify ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                UPDATE PARAMETER
              </button>
            </>
          ) : (
            ""
          )}
          <button
            onClick={handleModify}
            className={`mx-4 ${
              modify
                ? "bg-red-500 hover:bg-red-700"
                : "bg-blue-500 hover:bg-blue-700"
            } text-gray-900 hover:text-white font-semibold py-2 px-4 border rounded-lg`}
          >
            {modify ? "CANCEL" : "MODIFY"}
          </button>
        </div>
      </div>
    </>
  );
};

export default MasterSetting;

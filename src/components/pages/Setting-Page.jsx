import { useState } from "react";
import HeaderLayout from "../Header-component";
import Swal from "sweetalert2";
import { formatDate } from "../../services/formatTimeStamp";

const MasterSetting = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [PLM_Reference, setPLM_Reference] = useState("");
  const [EBOM_Reference, setEBOM_Reference] = useState("");
  const [manufacturingDate, setManufacturingDate] = useState("");
  const [EOLT_Reference, setEOLT_Reference] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [minLimitCurrent, setMinLimitCurrent] = useState("");
  const [maxLimitCurrent, setMaxLimitCurrent] = useState("");
  const [minLimitSensitivity, setMinLimitSensitivity] = useState("");
  const [maxLimitSensitivity, setMaxLimitSensitivity] = useState("");
  const [minLimitTHD, setMinLimitTHD] = useState("");
  const [maxLimitTHD, setMaxLimitTHD] = useState("");
  const [minLimitFrequency, setMinLimitFrequency] = useState("");
  const [maxLimitFrequency, setMaxLimitFrequency] = useState("");
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

  // Function to handle form submission
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
      <div className=" flex flex-wrap bg-gray-300 m-4 p-2 rounded-md w-90% h-fit">
        <div className="flex justify-between">
          <div className="card-content bg-gray-200 m-2 rounded-md w-96 h-fit ">
            <div className="title bg-green-500 p-2 rounded-t-md font-bold text-gray-700">
              <p>DMC CODE CONTENT</p>
            </div>
            <div className="content px-8 py-2 items-center">
              <div className=" flex flex-between flex-wrap justify-start">
                <div className="mr-4 mb-2">
                  <label className="block mb-2 text-sm font-medium  text-gray-700">
                    PLM Reference
                  </label>
                  <input
                    type="text"
                    id="PLM_Reference"
                    value={PLM_Reference}
                    className="w-32 p-2.5 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="PLM Ref."
                    onChange={(e) => setPLM_Reference(e.target.value)}
                    //   disabled={props.disable === true? true: false}
                  />
                </div>
                <div className="mr-4 mb-2">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    EBOM Reference
                  </label>
                  <input
                    type="text"
                    id="EBOM_Reference"
                    value={EBOM_Reference}
                    className="w-32 p-2.5 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="EBOM Ref."
                    onChange={(e) => setEBOM_Reference(e.target.value)}
                    //   disabled={props.disable === true? true: false}
                  />
                </div>
                <div className="mr-4 mb-2">
                  <label className="block mb-2 text-sm font-medium  text-gray-700">
                    Manufacturing Date
                  </label>
                  <input
                    type="date"
                    id="Date"
                    value={manufacturingDate}
                    className="w-32 p-2.5 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="EBOM Ref."
                    onChange={(e) => setManufacturingDate(e.target.value)}
                    //   disabled={props.disable === true? true: false}
                  />
                </div>
                <div className="mr-4 mb-2">
                  <label className="block mb-2 text-sm font-medium  text-gray-700">
                    EOLT Reference A/B
                  </label>
                  <input
                    type="text"
                    id="Line_Machine"
                    value={EOLT_Reference}
                    className="w-32 p-2.5 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="EOLT Ref."
                    onChange={(e) => setEOLT_Reference(e.target.value)}
                    //   disabled={props.disable === true? true: false}
                  />
                </div>
                <div className="mr-4 mb-2">
                  <label className="block mb-2 text-sm font-medium  text-gray-700">
                    SerialNumber
                  </label>
                  <input
                    type="text"
                    id="SerialNumber"
                    value={serialNumber}
                    className="w-32 p-2.5 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="SerialNumber"
                    onChange={(e) => setSerialNumber(e.target.value)}
                    //   disabled={props.disable === true? true: false}
                  />
                </div>
              </div>
            </div>
            <p className="text-xs pl-4 pb-4">
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
                  )}-${EOLT_Reference}-00001`
                : PLM_Reference && EBOM_Reference && manufacturingDate
                ? `Example : ${PLM_Reference}-${EBOM_Reference}-${formatDate(
                    manufacturingDate
                  )}-A-00001`
                : PLM_Reference && EBOM_Reference
                ? `Example : ${PLM_Reference}-${EBOM_Reference}-220924-A-00001`
                : PLM_Reference
                ? `Example : ${PLM_Reference}-yyyyyyyyyy-220924-A-00001`
                : `Example : xxxxxxxxxx-yyyyyyyyyy-220924-A-00001`}
            </p>
          </div>
          
          <div className="flex flex-between flex-wrap justify-start">
            <div className="card-content bg-gray-200 ml-2 mr-0.5 my-2 rounded-md w-100 h-fit">
              <div className="title bg-green-500 p-2 rounded-t-md font-bold text-gray-700">
                <p>CURRENT SETTING</p>
              </div>
              <div className="content p-4 items-center">
                <div className=" flex flex-between flex-wrap justify-start">
                  <div className="mr-2 mb-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Min-Limit
                    </label>
                    <input
                      type="text"
                      id="Min_Limit_crr"
                      value={minLimitCurrent}
                      className="w-32 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Min Limit"
                      onChange={(e) => setMinLimitCurrent(e.target.value)}
                      //   disabled={props.disable === true? true: false}
                    />
                  </div>
                  <div className="mr-2 mb-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Max-Limit
                    </label>
                    <input
                      type="text"
                      id="Max_Limit_crr"
                      value={maxLimitCurrent}
                      className="w-32 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Max Limit"
                      onChange={(e) => setMaxLimitCurrent(e.target.value)}
                      //   disabled={props.disable === true? true: false}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-content bg-gray-200 ml-2 mr-0.5 my-2 rounded-md w-100 h-fit">
              <div className="title bg-green-500 p-2 rounded-t-md font-bold text-gray-700">
                <p>SENSITIVITY</p>
              </div>
              <div className="content p-4 items-center">
                <div className=" flex flex-between flex-wrap justify-start">
                  <div className="mr-2 mb-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Min-Limit
                    </label>
                    <input
                      type="text"
                      id="Min_Limit_sen"
                      value={minLimitSensitivity}
                      className="w-32 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Min Limit"
                      onChange={(e) => setMinLimitSensitivity(e.target.value)}
                      //   disabled={props.disable === true? true: false}
                    />
                  </div>
                  <div className="mr-2 mb-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Max-Limit
                    </label>
                    <input
                      type="text"
                      id="Max_Limit_sen"
                      value={maxLimitSensitivity}
                      className="w-32 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Max Limit"
                      onChange={(e) => setMaxLimitSensitivity(e.target.value)}
                      //   disabled={props.disable === true? true: false}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-content bg-gray-200 ml-2 mr-0.5 my-2 rounded-md w-100 h-fit">
              <div className="title bg-green-500 p-2 rounded-t-md font-bold text-gray-700">
                <p>THD</p>
              </div>
              <div className="content p-4 items-center">
                <div className=" flex flex-between flex-wrap justify-start">
                  <div className="mr-2 mb-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Min-Limit
                    </label>
                    <input
                      type="text"
                      id="Min_Limit_thd"
                      value={minLimitTHD}
                      className="w-32 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Min Limit"
                      onChange={(e) => setMinLimitTHD(e.target.value)}
                      //   disabled={props.disable === true? true: false}
                    />
                  </div>
                  <div className="mr-2 mb-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Max-Limit
                    </label>
                    <input
                      type="text"
                      id="Max_Limit_thd"
                      value={maxLimitTHD}
                      className="w-32 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Max Limit"
                      onChange={(e) => setMaxLimitTHD(e.target.value)}
                      //   disabled={props.disable === true? true: false}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-content bg-gray-200 ml-2 mr-0.5 my-2 rounded-md w-100 h-fit">
              <div className="title bg-green-500 p-2 rounded-t-md font-bold text-gray-700">
                <p>Frequency</p>
              </div>
              <div className="content p-4 items-center">
                <div className=" flex flex-between flex-wrap justify-start">
                  <div className="mr-2 mb-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Min-Limit
                    </label>
                    <input
                      type="text"
                      id="Min_Limit_thd"
                      value={minLimitFrequency}
                      className="w-32 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Min Limit"
                      onChange={(e) => setMinLimitFrequency(e.target.value)}
                      //   disabled={props.disable === true? true: false}
                    />
                  </div>
                  <div className="mr-2 mb-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Max-Limit
                    </label>
                    <input
                      type="text"
                      id="Max_Limit_thd"
                      value={maxLimitFrequency}
                      className="w-32 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Max Limit"
                      onChange={(e) => setMaxLimitFrequency(e.target.value)}
                      //   disabled={props.disable === true? true: false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button className="mx-4 bg-green-500 hover:bg-green-700 text-gray-900 hover:text-white font-semibold py-2 px-4 border rounded-lg">
          UpdateData
        </button>
      </div>
    </>
  );
};

export default MasterSetting;

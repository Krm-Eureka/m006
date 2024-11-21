import { useState, useEffect, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import HeaderLayout from "../header-component/";
import {
  GetLastAcousticTraceLog,
  GetAcousticTraceDetailById,
} from "../../services/api-service/stationData";
import Loading from "../loadingComponent";
import StatusBox from "../statusBox";
// import getTraceabilityDataWithDate from "../../services/api-service/traceabilityReportData";
import traceabilityService from "../../services/api-service/traceabilityReportData";
import { useNavigate } from "react-router-dom";
function createSmrData(
  description,
  voltageType,
  lowerValue,
  upperValue,
  result,
  status
) {
  const formattedResult = parseFloat(parseFloat(result).toFixed(2));
  return {
    voltageType,
    description,
    lowerValue,
    upperValue,
    result: formattedResult,
    status,
  };
}

const Test5voltQuality = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [LstActLog, setLstActLog] = useState([]);
  const [LstStatusLog, setLstStatusLog] = useState([]);
  const [ActDetailById, setActDetailById] = useState([]);
  const [currentDescp, setCurrentDescp] = useState([]);
  const [smrData, setSmrData] = useState([]);
  const navigate = useNavigate();
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 86400000 * 7);
  const startDate = lastWeek.toISOString().split("T")[0] + " 00:00";
  const endDate = today.toISOString().split("T")[0] + " 23:59";

  useEffect(() => {
    const fetchData = async () => {
      try {
        await GetLastAcousticTraceLog("1", "1", setLstActLog, setLoading);
        await traceabilityService.getTraceabilityDataWithDate(
          "1",
          startDate,
          endDate,
          null,
          setLstStatusLog
        );
        // console.log(LstActLog);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();

    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
  }, [startDate, endDate]);

  const hasNavigated = useRef(false);
  useEffect(() => {
    if (
      LstActLog &&
      LstActLog?.qualityTestFlag === false &&
      LstActLog?.reTestFlag === false &&
      !hasNavigated.current
    ) {
      console.log("Navigating to AutoRun:", LstActLog?.qualityTestFlag);
      hasNavigated.current = true;
      navigate("/Console/Content_ACT/AutoRun");
    } else if (
      LstActLog &&
      LstActLog?.reTestFlag === true &&
      LstActLog?.qualityTestFlag === false &&
      !hasNavigated.current
    ) {
      console.log("Navigating to ReTest:", LstActLog?.reTestFlag);
      hasNavigated.current = true;
      navigate("/Console/Content_ACT/ManualRun");
    }
  }, [LstActLog, navigate]);
  useEffect(() => {
    if (LstActLog && LstActLog.id) {
      const fetchDetails = async () => {
        try {
          await GetAcousticTraceDetailById(
            "1",
            LstActLog.id,
            (res) => {
              setActDetailById(res);
              const uniqueSmrData = Array.from(
                new Map(
                  res.map((i) => [
                    i?.description,
                    createSmrData(
                      i?.description,
                      i?.voltageType,
                      i?.lowerValue,
                      i?.upperValue,
                      i?.result,
                      i?.status
                    ),
                  ])
                ).values()
              );

              const currentDescp = res.find(
                (item) => item.description === "Current"
              );
              // console.log(currentDescp);
              setCurrentDescp(currentDescp);
              setSmrData(uniqueSmrData);
              setLoading(false);
            },
            setLoading
          );
        } catch (error) {
          setError(error.message);
        }
      };
      fetchDetails();
    }
  }, [LstActLog]);

  const handleTEST = () => {
    setSmrData([
      //   {
      //     voltageType: 8,
      //     description: "current",
      //     lowerValue: 10.5,
      //     upperValue: 20.755,
      //     result: 15.25555,
      //     status: "fail",
      //   },
      //   {
      //     voltageType: 8,
      //     description: "thd",
      //     lowerValue: 10.5,
      //     upperValue: 20.75,
      //     result: 15.25,
      //     status: "pass",
      //   },
      //   {
      //     voltageType: 5,
      //     description: "thd",
      //     lowerValue: 11.233,
      //     upperValue: 21.75,
      //     result: 20.25,
      //     status: "passed",
      //   },
      //   {
      //     voltageType: 8,
      //     description: "sensitivity",
      //     lowerValue: 10.5,
      //     upperValue: 20.75,
      //     result: 15.25,
      //     status: "failed",
      //   },
      //   {
      //     voltageType: 8,
      //     description: "frequency",
      //     lowerValue: 10.5,
      //     upperValue: 20.75,
      //     result: 15.25,
      //     status: "fail",
      //   },
      //   {
      //     voltageType: 5,
      //     description: "Current",
      //     lowerValue: 10.522222,
      //     upperValue: 20.75,
      //     result: 15.25,
      //     status: "pass",
      //   },
      // ]);
      // setCurrentDescp([
      //   {
      //     voltageType: 8,
      //     description: "Current",
      //     lowerValue: 10.5,
      //     upperValue: 20.75,
      //     result: 15.25,
      //     status: "pass",
      //   },
    ]);

    console.log("5V", voltageType5Data);
    console.log("8V", voltageType8Data);
    console.log(LstActLog);

    setLoading(false);
  };
  const mapStatus = (value) => {
    switch (value) {
      case 0:
        return null;
      case 1:
        return "PASS";
      case 2:
        return "FAIL";
      case 3:
        return "Unknown";
      default:
        return value;
    }
  };

  // console.log(ActDetailById);
  // console.log("Lst Log : ", LstStatusLog);

  const sortedStatus = [...(LstStatusLog || [])].sort(
    (a, b) => new Date(b.lastUpdateDate) - new Date(a.lastUpdateDate)
  );
  const voltageType5Data = smrData.filter((item) => item?.voltageType === 5);
  const voltageType8Data = smrData.filter((item) => item?.voltageType === 8);

  // qualityTestFlag === true show Data === false don't show data
  return (
    <>
      <HeaderLayout page="Quality Test Mode" />
      <div className="content h-screen">
        <div className="text-gray-800 bg-gray-300 m-4 rounded-md w-90% h-fit">
          <>
            <div className="title bg-orange-400 p-2 rounded-t-md font-bold">
              <p>
                Acoustic EOLT Station : 5v Quality Test Mode{" "}
                {LstActLog?.qualityTestFlag === true ? (
                  <>
                    <span className="text-white font-bold">
                      {LstActLog?.serialCode}
                    </span>
                  </>
                ) : (
                  ""
                )}
              </p>
            </div>
            <div className="content flex flex-wrap flex-between p-4 items-center">
              {LstActLog?.qualityTestFlag === true ? (
                <>
                  <StatusBox
                    name="AcousticTest"
                    status={LstActLog?.acousticStatus}
                  />
                  {LstActLog?.length > 0 || LstActLog?.id ? (
                    <StatusBox
                      name="Current"
                      status={
                        currentDescp?.status === "FAIL" ||
                        currentDescp?.status === "fail" ||
                        currentDescp?.status === 3
                          ? 3
                          : currentDescp?.status === "PASS" ||
                            currentDescp?.status === "pass" ||
                            currentDescp?.status === 2
                          ? 2
                          : 0
                      }
                    />
                  ) : (
                    <StatusBox name="Current" />
                  )}
                  <StatusBox
                    name="LaserMark"
                    status={LstActLog?.laserMarkStatus}
                  />
                  <StatusBox name="QRCode" status={LstActLog?.qrStatus} />
                  <StatusBox
                    name="TotalStatus"
                    status={LstActLog?.totalJudgement}
                  />
                </>
              ) : (
                <>
                  <StatusBox name="AcousticTest" />
                  <StatusBox name="Current" />
                  <StatusBox name="LaserMark" />
                  <StatusBox name="QRCode" />
                  <StatusBox name="TotalStatus" />
                </>
              )}
            </div>
          </>
          {/* )}  */}
        </div>

        <div className="flex mx-2 sm:flex-wrap lg:flex-wrap">
          <div className="md:mb-4 text-gray-800 bg-gray-300 mx-2 rounded-md w-90% h-fit">
            <div className="title bg-orange-400 p-2 rounded-t-md text-gray-700 font-bold">
              <p>Show Data Run Summary 8v.</p>
              <div>
                {/* <button onClick={handleTEST} className="text-red-500">
                  TEST
                </button> */}
              </div>
            </div>
            <div className="content flex flex-between p-4 items-center">
              <div className="flex flex-between flex-wrap justify-start">
                <TableContainer component={Paper}>
                  <Table
                    sx={{ width: 800, overflowX: "auto" }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">
                          <p className="font-semibold">Name</p>
                        </TableCell>
                        <TableCell align="center">
                          <p className="font-semibold">Lower</p>
                        </TableCell>
                        <TableCell align="center">
                          <p className="font-semibold">Upper</p>
                        </TableCell>
                        <TableCell align="center">
                          <p className="font-semibold">Result</p>
                        </TableCell>
                        <TableCell align="center">
                          <p className="font-semibold">Status</p>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(voltageType8Data.length <= 0 &&
                        LstActLog?.qualityTestFlag === false) ||
                      LstActLog?.qualityTestFlag === undefined ? (
                        <TableRow>
                          {/* <div>
                            <button onClick={handleTEST}>TEST</button>
                          </div> */}
                          <TableCell colSpan={3} align="center">
                            <div className="items-center justify-center text-center p-4 pl-60">
                              <p className="text-gray-600 font-semibold">
                                No data available
                              </p>
                              <Loading text="Data Not Found . . ." />
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        voltageType8Data.map((Data8v, idx) => (
                          <TableRow
                            key={idx}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="left" component="th" scope="row">
                              <p className="font-semibold">
                                {Data8v.description.toLowerCase() === "current"
                                  ? "Current (mA)"
                                  : Data8v.description.toLowerCase() ===
                                    "sensitivity"
                                  ? "Sensitivity (dBV/Pa)"
                                  : Data8v.description.toLowerCase() ===
                                    "frequency"
                                  ? "Frequency"
                                  : Data8v.description.toLowerCase() === "thd"
                                  ? "THD (%)"
                                  : Data8v.description}
                              </p>
                            </TableCell>
                            <TableCell align="center">
                              {Data8v.description.toLowerCase() ===
                              "frequency" ? (
                                "NA"
                              ) : (
                                <p className="font-semibold">
                                  {Data8v.lowerValue}
                                </p>
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {Data8v.description.toLowerCase() ===
                              "frequency" ? (
                                "NA"
                              ) : (
                                <p className="font-semibold">
                                  {Data8v.upperValue}
                                </p>
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {Data8v.result === "Fail" ? (
                                <p className="text-red-700 font-semibold">
                                  {Data8v.result}
                                </p>
                              ) : Data8v.description.toLowerCase() ===
                                  "sensitivity" ||
                                Data8v.description.toLowerCase() === "thd" ||
                                Data8v.description.toLowerCase() ===
                                  "current" ? (
                                Data8v.result !== "" &&
                                !isNaN(parseFloat(Data8v.result)) &&
                                Data8v.lowerValue !== "" &&
                                !isNaN(parseFloat(Data8v.lowerValue)) &&
                                Data8v.upperValue !== "" &&
                                !isNaN(parseFloat(Data8v.upperValue)) &&
                                parseFloat(Data8v.result) >=
                                  parseFloat(Data8v.lowerValue) &&
                                parseFloat(Data8v.result) <=
                                  parseFloat(Data8v.upperValue) ? (
                                  <p className="text-green-700 font-semibold">
                                    {Data8v.result}
                                  </p>
                                ) : (
                                  <p className="text-red-700 font-semibold">
                                    {Data8v.result}
                                  </p>
                                )
                              ) : Data8v.description.toLowerCase() ===
                                "frequency" ? null : (
                                Data8v.result ===
                                (
                                  <p className="text-green-700 font-semibold">
                                    {Data8v.result}
                                  </p>
                                )
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {Data8v.status.toLowerCase() === "failed" ||
                              Data8v.status.toLowerCase() === "fail" ? (
                                <p className="text-red-700 font-semibold">
                                  FAIL
                                </p>
                              ) : Data8v.status.toLowerCase() === "pass" ||
                                Data8v.status.toLowerCase() === "passed" ? (
                                <p className="text-green-700 font-semibold">
                                  PASS
                                </p>
                              ) : Data8v.status.toLowerCase() === "" ? (
                                <p className="font-semibold text-yellow-500">
                                  Exception
                                </p>
                              ) : (
                                ""
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
            <div className="title bg-orange-400 p-2 rounded-t-md text-gray-800 font-bold">
              <p>Show Data Run Summary 5v.</p>
              {/* <div>
                <button onClick={handleTEST} className="text-red-500">
                  TEST
                </button>
              </div> */}
            </div>
            <div className="content flex flex-between p-4 items-center">
              <div className="flex flex-between flex-wrap justify-start">
                <TableContainer component={Paper}>
                  <Table
                    sx={{ width: 800, overflowX: "auto" }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">
                          <p className="font-semibold">Name</p>
                        </TableCell>
                        <TableCell align="center">
                          <p className="font-semibold">Lower</p>
                        </TableCell>
                        <TableCell align="center">
                          <p className="font-semibold">Upper</p>
                        </TableCell>
                        <TableCell align="center">
                          <p className="font-semibold">Result</p>
                        </TableCell>
                        <TableCell align="center">
                          <p className="font-semibold">Status</p>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(voltageType5Data.length <= 0 &&
                        LstActLog?.qualityTestFlag === false) ||
                      LstActLog?.qualityTestFlag === undefined ? (
                        <TableRow>
                          {/* <div>
                            <button onClick={handleTEST}>TEST</button>
                          </div> */}
                          <TableCell colSpan={3} align="center">
                            <div className="items-center justify-center text-center p-4 pl-60">
                              <p className="text-gray-600 font-semibold">
                                No data available
                              </p>
                              <Loading text="Data Not Found . . ." />
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        voltageType5Data.map((Data5v, idx) => (
                          <TableRow
                            key={idx}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="left" component="th" scope="row">
                              <p className="font-semibold">
                                {Data5v.description.toLowerCase() === "thd"
                                  ? "THD (%)"
                                  : Data5v.description.toLowerCase() ===
                                    "current"
                                  ? "Current"
                                  : null}
                              </p>
                            </TableCell>
                            <TableCell align="center">
                              {Data5v.description.toLowerCase() === "thd" ||
                              Data5v.description.toLowerCase() === "current"
                                ? Data5v.lowerValue
                                : null}
                            </TableCell>
                            <TableCell align="center">
                              {Data5v.description.toLowerCase() === "thd" ||
                              Data5v.description.toLowerCase() === "current"
                                ? Data5v.upperValue
                                : null}
                            </TableCell>
                            <TableCell align="center">
                              {Data5v.result === "Fail" ? (
                                <p className="text-red-700 font-semibold">
                                  {Data5v.result}
                                </p>
                              ) : Data5v.description.toLowerCase() === "thd" ||
                                Data5v.description.toLowerCase() ===
                                  "current" ? (
                                Data5v.result !== "" &&
                                !isNaN(parseFloat(Data5v.result)) &&
                                Data5v.lowerValue !== "" &&
                                !isNaN(parseFloat(Data5v.lowerValue)) &&
                                Data5v.upperValue !== "" &&
                                !isNaN(parseFloat(Data5v.upperValue)) &&
                                parseFloat(Data5v.result) >=
                                  parseFloat(Data5v.lowerValue) &&
                                parseFloat(Data5v.result) <=
                                  parseFloat(Data5v.upperValue) ? (
                                  <p className="text-green-700 font-semibold">
                                    {Data5v.result}
                                  </p>
                                ) : (
                                  <p className="text-red-700 font-semibold">
                                    {Data5v.result}
                                  </p>
                                )
                              ) : Data5v.description.toLowerCase() ===
                                "frequency" ? null : (
                                Data5v.result ===
                                (
                                  <p className="text-green-700 font-semibold">
                                    {Data5v.result}
                                  </p>
                                )
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {Data5v.status.toLowerCase() === "failed" ||
                              Data5v.status.toLowerCase() === "fail" ? (
                                <p className="text-red-700 font-semibold">
                                  FAIL
                                </p>
                              ) : Data5v.status.toLowerCase() === "pass" ||
                                Data5v.status.toLowerCase() === "passed" ? (
                                <p className="text-green-700 font-semibold">
                                  PASS
                                </p>
                              ) : Data5v.status.toLowerCase() === "" ? (
                                <p className="font-semibold text-yellow-500">
                                  Exception
                                </p>
                              ) : (
                                ""
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>

          <div className="text-gray-800 bg-gray-300 mx-2 rounded-md w-90% h-fit">
            <div className="title bg-orange-400 p-2 rounded-t-md text-gray-700 font-bold">
              <p>Last Data Status</p>
            </div>
            <div className="content p-4 items-center">
              <div className="flex flex-between flex-wrap justify-start">
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 500, maxWidth: 700, overflowX: "auto" }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <p className="font-semibold">Serial No.</p>
                        </TableCell>
                        <TableCell align="center">
                          <p className="font-semibold">Lasermark Code</p>
                        </TableCell>
                        <TableCell align="center">
                          <p className="font-semibold">Result</p>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Array.isArray(LstStatusLog) &&
                      LstStatusLog?.length > 0 ? (
                        sortedStatus.slice(1, 6).map((row) => {
                          const extractedCode = row.serialCode
                            ? row.serialCode.split("-").pop()
                            : "N/A";

                          const number =
                            extractedCode !== "N/A"
                              ? parseInt(extractedCode, 10)
                              : "N/A";
                          return (
                            <TableRow
                              key={row.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="center">
                                <p className="font-semibold">{number}</p>
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                align="left"
                              >
                                <p className="font-semibold">
                                  {row.serialCode}
                                </p>
                              </TableCell>
                              <TableCell align="center">
                                {row.totalJudgement === 1 ? (
                                  <p className="text-green-700 font-semibold">
                                    {mapStatus(row.totalJudgement)}
                                  </p>
                                ) : row.totalJudgement === 3 ? (
                                  <p className="text-red-700 font-semibold">
                                    {mapStatus(row.totalJudgement)}
                                  </p>
                                ) : row.totalJudgement === 2 ? (
                                  <p className="text-red-500 font-semibold">
                                    {mapStatus(row.totalJudgement)}
                                  </p>
                                ) : (
                                  <p className="text-yellow-500 font-semibold">
                                    {mapStatus(row.totalJudgement)}
                                  </p>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} align="center">
                            <div className="items-center justify-center text-center p-4">
                              <p className="text-gray-600 font-semibold">
                                No data available
                              </p>
                              <Loading text="Data Not Found . . ." />
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test5voltQuality;

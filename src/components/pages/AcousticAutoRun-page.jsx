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
import GraphContain from "../graph";

function createSmrData(description, lowerValue, upperValue, result, status) {
  const formattedResult = parseFloat(result).toFixed(2);
  return {
    description,
    lowerValue,
    upperValue,
    result: formattedResult,
    status,
  };
}

const TraceabilityStatus = () => {
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(null);
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
      } catch (err) {
        setError(err.message);
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
      LstActLog.qualityTestFlag === true &&
      LstActLog.reTestFlag === false &&
      !hasNavigated.current
    ) {
      console.log("Navigating to QMode:", LstActLog?.qualityTestFlag);
      hasNavigated.current = true;
      try {
        navigate("/Console/Content_ACT/QMode");
      } catch (error) {
        console.error("Navigation error:", error);
      }
    }
    // else if (
    //   LstActLog &&
    //   LstActLog.reTestFlag === true &&
    //   LstActLog.qualityTestFlag === false &&
    //   !hasNavigated.current
    // ) {
    //   console.log("Navigating to reTestMode:", LstActLog?.reTestFlag);
    //   hasNavigated.current = true;
    //   try {
    //     navigate("/Console/Content_ACT/ManualRun");
    //   } catch (error) {
    //     console.error("Navigation error:", error);
    //   }
    // }
    return () => {
      hasNavigated.current = false;
    };
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
                    i.description,
                    createSmrData(
                      i.description,
                      i.lowerValue,
                      i.upperValue,
                      i.result,
                      i.status
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
        } catch (err) {
          setError(err.message);
        }
      };
      fetchDetails();
    }
  }, [LstActLog]);

  // const handleTEST = () => {
  //   setSmrData([
  //     {
  //     description: "Sample item description",
  //     lowerValue: 10.5,
  //     upperValue: 20.75,
  //     result: 15.25,
  //     status: 'pass'
  //   },
  //     {
  //     description: "Sample item description",
  //     lowerValue: 10.5,
  //     upperValue: 20.75,
  //     result: 15.25,
  //     status: 'fail'
  //   },
  //     {
  //     description: "Sample item description",
  //     lowerValue: 10.5,
  //     upperValue: 20.75,
  //     result: 15.25,
  //     status: 'passed'
  //   },
  //     {
  //     description: "Sample item description",
  //     lowerValue: 10.5,
  //     upperValue: 20.75,
  //     result: 15.25,
  //     status: 'failed'
  //   },
  // ])
  //   setCurrentDescp([{
  //     description: "Sample item description",
  //     lowerValue: 10.5,
  //     upperValue: 20.75,
  //     result: 15.25,
  //     status: 'pass'
  //   }])
  //   setLoading(false)
  // }
  const mapStatus = (v) => {
    switch (v) {
      case 0:
        return null;
      case 1:
        return "PASS";
      case 2:
        return "FAIL";
      case 3:
        return "Unknown";
      default:
        return v;
    }
  };

  // console.log(ActDetailById);
  // console.log("Lst Log : ", LstStatusLog);

  const sortedStatus = [...(LstStatusLog || [])].sort(
    (a, b) => new Date(b.lastUpdateDate) - new Date(a.lastUpdateDate)
  );

  return (
    <>
      <HeaderLayout page="Traceability Status" />
      <div className="content h-screen">
        <div className="text-gray-700 bg-gray-300 m-4 rounded-md w-90% h-fit">
          <>
            <div className="title bg-green-500 p-2 rounded-t-md font-bold">
              <p>
                Acoustic EOLT Station : AUTO Mode{" "}
                {/* {LstActLog?.productionLineName || ""}  */}
                {">>>"}
                <span className="text-red-600 font-bold">
                  {LstActLog?.serialCode}
                </span>
              </p>
            </div>
            <div className="content flex flex-wrap flex-between p-4 items-center">
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
              <StatusBox name="LaserMark" status={LstActLog?.laserMarkStatus} />
              <StatusBox name="QRCode" status={LstActLog?.qrStatus} />
              <StatusBox
                name="TotalStatus"
                status={LstActLog?.totalJudgement}
              />
            </div>
          </>
          {/* )}  */}
        </div>
        {/* <GraphContain /> */}
        <div className="flex mx-2 sm:flex-wrap lg:flex-wrap">
          <div className="md:mb-4 text-gray-700 bg-gray-300 mx-2 rounded-md w-90% h-fit">
            <div className="title bg-green-500 p-2 rounded-t-md text-gray-700 font-bold">
              <p>Show Data Run Summary</p>
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
                      {smrData.length <= 0 ? (
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
                        smrData.map((row, idx) => (
                          <TableRow
                            className={
                              row.status.toLowerCase() === "failed" ||
                              row.status.toLowerCase() === "fail"
                                ? "bg-red-100"
                                : ""
                            }
                            key={idx}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="left" component="th" scope="row">
                              <p className="font-semibold ">
                                {row.description.toLowerCase() === "current"
                                  ? "Current (mA)"
                                  : row.description.toLowerCase() ===
                                    "sensitivity"
                                  ? "Sensitivity (dBV/Pa)"
                                  : row.description.toLowerCase() === "thd"
                                  ? "THD (%)"
                                  : row.description}
                              </p>
                            </TableCell>
                            <TableCell align="center">
                              {row.description.toLowerCase() === "frequency" ? (
                                <p className="font-semibold ">NA</p>
                              ) : (
                                <p className="font-semibold">
                                  {row.lowerValue}
                                </p>
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {row.description.toLowerCase() === "frequency" ? (
                                <p className="font-semibold ">NA</p>
                              ) : (
                                <p className="font-semibold ">
                                  {row.upperValue}
                                </p>
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {row.result === "Fail" ? (
                                <p className="text-red-700 font-semibold">
                                  {row.result}
                                </p>
                              ) : row.description.toLowerCase() ===
                                  "sensitivity" ||
                                row.description.toLowerCase() === "thd" ||
                                row.description.toLowerCase() === "current" ? (
                                row.result !== "" &&
                                !isNaN(parseFloat(row.result)) &&
                                row.lowerValue !== "" &&
                                !isNaN(parseFloat(row.lowerValue)) &&
                                row.upperValue !== "" &&
                                !isNaN(parseFloat(row.upperValue)) &&
                                parseFloat(row.result) >=
                                  parseFloat(row.lowerValue) &&
                                parseFloat(row.result) <=
                                  parseFloat(row.upperValue) ? (
                                  <p className="text-green-700 font-semibold">
                                    {row.result}
                                  </p>
                                ) : (
                                  <p className="text-red-700 font-semibold">
                                    {row.result}
                                  </p>
                                )
                              ) : row.description.toLowerCase() ===
                                "frequency" ? null : (
                                row.result ===
                                (
                                  <p className="text-green-700 font-semibold">
                                    {row.result}
                                  </p>
                                )
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {row.status.toLowerCase() === "failed" ||
                              row.status.toLowerCase() === "fail" ? (
                                <p className="text-red-700 font-semibold">
                                  FAIL
                                </p>
                              ) : row.status.toLowerCase() === "pass" ||
                                row.status.toLowerCase() === "passed" ? (
                                <p className="text-green-700 font-semibold">
                                  PASS
                                </p>
                              ) : row.status.toLowerCase() === "" ? (
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

          <div className="text-gray-700 bg-gray-300 mx-2 rounded-md w-90% h-fit">
            <div className="title bg-green-500 p-2 rounded-t-md text-gray-700 font-bold">
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

export default TraceabilityStatus;

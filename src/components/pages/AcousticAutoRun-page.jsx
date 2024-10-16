import { useState, useEffect } from "react";
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
  const [error, setError] = useState(null);
  const [LstActLog, setLstActLog] = useState(null);
  const [LstStatusLog, setLstStatusLog] = useState(null);
  const [ActDetailById, setActDetailById] = useState(null);
  const [currentDescp, setCurrentDescp] = useState(null);
  const [smrData, setSmrData] = useState([]);
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 86400000 * 7);
  const startDate = lastWeek.toISOString().split("T")[0];
  const endDate = today.toISOString().split("T")[0];

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
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
  }, [startDate, endDate]);

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
                  res.map((item) => [
                    item.description,
                    createSmrData(
                      item.description,
                      item.lowerValue,
                      item.upperValue,
                      item.result,
                      item.status
                    ),
                  ])
                ).values()
              );
              const currentDescp = res.find(
                (item) => item.description === "Current"
              );
              console.log(currentDescp);
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
  const mapStatus = (value) => {
    switch (value) {
      case 0:
        return "Exception";
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

  const sortedStatus = [...(LstStatusLog || [])].sort((a, b) => b.id - a.id);

  return (
    <>
      <HeaderLayout page="Traceability Status" />
      <div className="content h-screen">
        <div className="text-gray-700 bg-gray-300 m-4 rounded-md w-90% h-fit">
          {loading ? (
            <>
              <div className="title bg-green-500 p-2 rounded-t-md font-bold">
                <p>
                  Show Process Current of Auto EOLTStation{" "}
                  <span className="text-red-600 font-bold">X-X</span> {">>>"}
                  <span className="text-red-600 font-bold">X-X-X-X-X</span>
                </p>
              </div>
              <div className="items-center justify-center text-center p-4">
                <p className="text-gray-600 font-semibold">No data available</p>
                <Loading text="Data Not Found . . ." />
              </div>
            </>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <>
              <div className="title bg-green-500 p-2 rounded-t-md font-bold">
                <p>
                  Show Process Current of Auto EOLTStation{" "}
                  {LstActLog.productionLineName} {">>>"}
                  <span className="text-red-600 font-bold">
                    {LstActLog.serialCode}
                  </span>
                </p>
              </div>
              <div className="content flex flex-wrap flex-between p-4 items-center">
                <StatusBox
                  name="AcousticTest"
                  status={LstActLog.acousticStatus}
                />
                {currentDescp ? (
                  <StatusBox
                    name="Current"
                    status={
                      currentDescp.status === "FAIL"
                        ? 3
                        : currentDescp.status === "PASS"
                        ? 2
                        : 4
                    }
                  />
                ) : (
                  <StatusBox name="Current" />
                )}
                <StatusBox
                  name="LaserMark"
                  status={LstActLog.laserMarkStatus}
                />
                <StatusBox name="QRCode" status={LstActLog.qrStatus} />
                <StatusBox
                  name="TotalStatus"
                  status={LstActLog.totalJudgement}
                />
              </div>
            </>
          )}
        </div>

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
                      {smrData.map((row, idx) => (
                        <TableRow
                          key={idx}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="left" component="th" scope="row">
                            <p className="font-semibold">{row.description}</p>
                          </TableCell>
                          <TableCell align="center">
                            <p className="font-semibold">{row.lowerValue}</p>
                          </TableCell>
                          <TableCell align="center">
                            <p className="font-semibold">{row.upperValue}</p>
                          </TableCell>
                          <TableCell align="center">
                            {row.result === "Fail" ? (
                              <p className="text-red-700 font-semibold">
                                {row.result}
                              </p>
                            ) : row.description.toLowerCase() ===
                              "sensitivity" ? (
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
                              <p className="text-green-700 font-semibold">
                                {row.result}
                              </p>
                            )}
                          </TableCell>

                          <TableCell align="center">
                            {row.status.toLowerCase() === "failed" ? (
                              <p className="text-red-700 font-semibold">FAIL</p>
                            ) : row.status.toLowerCase() === "pass" ? (
                              <p className="text-green-700 font-semibold">
                                PASS
                              </p>
                            ) : row.status.toLowerCase() === "fail" ? (
                              <p className="text-red-700 font-semibold">FAIL</p>
                            ) : row.status.toLowerCase() === "" ? (
                              <p className="font-semibold text-yellow-500">
                                Exception
                              </p>
                            ) : (
                              ""
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
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
                          <p className="font-semibold">ID</p>
                        </TableCell>
                        <TableCell align="center">
                          <p className="font-semibold">Serial_Code</p>
                        </TableCell>
                        <TableCell align="center">
                          <p className="font-semibold">Result</p>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {LstStatusLog && LstStatusLog.length > 0 ? (
                        sortedStatus.slice(0, 5).map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="center">
                              <p className="font-semibold">{row.id}</p>
                            </TableCell>
                            <TableCell component="th" scope="row" align="left">
                              <p className="font-semibold">{row.serialCode}</p>
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
                        ))
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

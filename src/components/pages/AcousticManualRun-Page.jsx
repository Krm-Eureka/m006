import { useState, useEffect, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import HeaderLayout from "../Header-component";
import StatusBox from "../statusBox";
import Loading from "../loadingComponent";
import traceabilityService from "../../services/api-service/traceabilityReportData";
import {
  GetAcousticTraceDetailById,
  GetLastRetestAcoustic,
} from "../../services/api-service/stationData";

function createSmrData(description, lowerValue, upperValue, result, status) {
  return {
    description,
    lowerValue,
    upperValue,
    result: parseFloat(result).toFixed(2),
    status,
  };
}

const AcousticManualRun = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [dataBySerial, setDataBySerial] = useState(null);
  const [LstRetest, setLstRetest] = useState([]);
  const [error, setError] = useState("");
  const [serialRun, setSerialRun] = useState("");
  const [LstStatusLog, setLstStatusLog] = useState([]);
  const [smrData, setSmrData] = useState([]);
  const [currentDescp, setCurrentDescp] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ActDetailById, setActDetailById] = useState([]);
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 86400000 * 7);
  const startDate = lastWeek.toISOString().split("T")[0] + " 00:00";
  const endDate = today.toISOString().split("T")[0] + " 23:59";
  const inputRef = useRef(null);
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
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleRunClick = async () => {
    setSerialRun(serialNumber);
    // setLoading(true);
    try {
      const dataSerial =
        await traceabilityService.getAcousticTraceLogBySerialNo(
          "1",
          serialNumber,
          setDataBySerial
        );
      console.log(dataSerial);
      console.log(dataSerial?.id);
      console.log(dataSerial?.reTestFlag);
      
      setDataBySerial(dataSerial);
      await delay(2000);
      if (dataSerial?.id) {
        await delay(1000);
        if (dataSerial?.reTestFlag === false) {
          console.log({ id: dataSerial?.id });
          await traceabilityService.SetReTestAcousticTracLogById("1", {
            id: dataSerial?.id,
          });
          console.log("Retest called with ID:", dataSerial?.id);
          await delay(500);
        } else {
          console.error("Data fetched but ID is missing.");
          setError("Data fetched but ID is missing.");
          await delay(500);
        }
      } else {
        console.error("Failed to fetch valid data.");
        setError("Failed to fetch valid data.");
      }
      console.log("Data fetched successfully:", dataBySerial);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching traceability data:", err);
    }
    // finally {
    //   setLoading(false);
    // }
  };
  useEffect(() => {
    const fetchData = async () => {
      // get Old DATA
      try {
        // if (!LstRetest || LstRetest.NewAcousticId === 0) {
        await GetLastRetestAcoustic("1", setLstRetest, setLoading);
        // }
        // if (LstRetest.NewAcousticId && LstRetest.NewAcousticId !== 0) {
        //   DoGetNewRetest();
        // }
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

  const handleInputChange = (e) => {
    setSerialNumber(e.target.value);
  };

  useEffect(() => {
    if (LstRetest && LstRetest?.newSerialCode) {
      console.log(LstRetest?.newSerialCode);
      
      const fetchDetails = async () => {
        try {
          await GetAcousticTraceDetailById(
            "1",
            LstRetest?.newSerialCode,
            (res) => {
              setActDetailById(res);
              console.log(res);
              
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
  }, [LstRetest]);

  // useEffect(() => {
  //   const fetchDetails = async () => {
  //     if (!LstRetest || !LstRetest.newAcousticId) return;
  //     try {
  //       const res = await GetAcousticTraceDetailById(
  //         "1",
  //         LstRetest?.newAcousticId,
  //         setActDetailById,
  //         setLoading
  //       );

  //       const uniqueSmrData = Array.from(
  //         new Map(
  //           res.map((item) => [
  //             item.description,
  //             createSmrData(
  //               item.description,
  //               item.lowerValue,
  //               item.upperValue,
  //               item.result,
  //               item.status
  //             ),
  //           ])
  //         ).values()
  //       );

  //       const currentDescp = res.find((item) => item.description === "Current");
  //       setCurrentDescp(currentDescp);
  //       setSmrData(uniqueSmrData);
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //     // finally {
  //     //   setLoading(false);
  //     // }
  //   };

    fetchDetails();
    const intervalId =
      LstRetest && LstRetest?.newAcousticId
        ? setInterval(fetchDetails, 2000)
        : null;
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [LstRetest]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // useEffect(() => {
  //   if (LstRetest.NewAcousticId !== 0) {
  //     DoGetNewRetest();
  //   }
  // }, [LstRetest.NewAcousticId]);
  const DoGetNewRetest = async () => {
    try {
      await traceabilityService.newRetest(
        "1",
        LstRetest.newAcousticId,
        setLstRetest
      );
    } catch (error) {
      setError(error.message);
    }
  };
  const sortedStatus = [...LstStatusLog].sort((a, b) => b.id - a.id);

  return (
    <>
      <HeaderLayout page="Acoustic Retest" />
      <div className="content h-screen">
        <div className="text-gray-700 bg-gray-300 m-4 rounded-md w-90% h-fit">
          <div className="title bg-green-500 p-2 rounded-t-md font-bold">
            <p>
              Show Process Current of Retest EOLTStation {">>>"}{" "}
              <span className="text-red-600 font-semibold">
                {/* {dataBySerial?.serialCode || "N/A"} */}
                {serialRun || "N/A"}
              </span>
            </p>
          </div>
          <div className="mb-2 mt-4 mx-6 font-semibold">
            <label htmlFor="SN">Serial Number :</label>
            <input
              id="SN"
              ref={inputRef}
              className="mx-2 p-2 rounded-md w-96"
              type="text"
              placeholder="Serial Number"
              value={serialNumber}
              onChange={handleInputChange}
            />
            <button
              className="mx-2 my-1 py-2 px-4 font-semibold bg-blue-500 hover:bg-blue-700 text-white h-fit w-fit border rounded-btn"
              onClick={handleRunClick}
            >
              Run
            </button>
          </div>
          {/* {loading  || LstRetest.length <= 0 ? (
            <>
              <div className="items-center justify-center text-center p-4">
                <p className="text-gray-600 font-semibold">No data available</p>
                <Loading text="Data Not Found . . ." />
              </div>
            </>
          ) : ( */}
          <div className="content flex flex-wrap flex-between p-4 items-center">
            <StatusBox name="AcousticTest" status={LstRetest?.acousticStatus} />
            {LstRetest?.length > 0 || LstRetest?.id ? (
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
            <StatusBox name="LaserMark" status={LstRetest?.laserMarkStatus} />
            <StatusBox name="QRCode" status={LstRetest?.qrStatus} />
            <StatusBox name="TotalStatus" status={LstRetest?.totalJudgement} />
          </div>
          {/* )} */}
        </div>

        {/* {data summary } */}
        <div className="flex mx-2 sm:flex-wrap lg:flex-wrap">
          <div className="md:mb-4 text-gray-700 bg-gray-300 mx-2 rounded-md w-90% h-fit">
            <div className="title bg-green-500 p-2 rounded-t-md text-gray-700 font-bold">
              <p>Show Data Run Summary</p>
            </div>
            <div className="content flex flex-between p-4 items-center">
              <TableContainer component={Paper}>
                <Table
                  sx={{ width: 800, overflowX: "auto" }}
                  aria-label="summary table"
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
                  {smrData?.length > 0 ? (
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
                            {row.description.toLowerCase() === "frequency" ? (
                              "NA"
                            ) : (
                              <p className="font-semibold">{row.lowerValue}</p>
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {row.description.toLowerCase() === "frequency" ? (
                              "NA"
                            ) : (
                              <p className="font-semibold">{row.upperValue}</p>
                            )}
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
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <div className="items-center justify-center text-center p-4 pl-60">
                          <p className="text-gray-600 font-semibold">
                            No data available
                          </p>
                          <Loading text="Data Not Found . . ." />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Table>
              </TableContainer>
            </div>
          </div>
          <div className="text-gray-700 bg-gray-300 mx-2 rounded-md w-90% h-fit">
            <div className="title bg-green-500 p-2 rounded-t-md text-gray-700 font-bold">
              <p>Last Data Status</p>
            </div>
            <div className="content p-4 items-center">
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 500, maxHeight: 300, overflowY: "auto" }}
                  aria-label="status table"
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
                    {LstStatusLog && LstStatusLog.length > 0 ? (
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
                              {/* <p className="font-semibold">{row.id}</p> */}
                              <p className="font-semibold">{number}</p>
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
        {/* {loading && <Loading />}
        {error && <div className="text-red-600">{error}</div>} */}
      </div>
    </>
  );
};

export default AcousticManualRun;

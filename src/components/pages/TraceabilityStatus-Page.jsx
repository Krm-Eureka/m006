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

// function createLstStatus(SerialCode, Result) {
//   return { SerialCode, Result };
// }

// const lstStatus = [
//   createLstStatus("EOLT-A-382315929117", "PASS"),
//   createLstStatus("EOLT-A-120885838401", "PASS"),
//   createLstStatus("EOLT-A-554779049699", "PASS"),
//   createLstStatus("EOLT-A-37003047849", "Fail"),
//   createLstStatus("EOLT-A-529520075944", "PASS"),
// ];
function createSmrData(description, lowerValue, upperValue, result, status) {
  const formattedResult = parseFloat(result).toFixed(4);
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
  const [ActDetailById, setActDetailById] = useState(null);
  const [smrData, setSmrData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await GetLastAcousticTraceLog("1", "1", setLstActLog, setLoading);
      } catch (error) {
        setError(error.message);
      }

    };

    fetchData();
    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (LstActLog && LstActLog.id) {
      const fetchDetails = async () => {
        try {
          await GetAcousticTraceDetailById(
            "1",
            LstActLog.id,
            (response) => {
              setActDetailById(response);

              const updatedSmrData = response.map((item) =>
                createSmrData(
                  item.description,
                  item.lowerValue,
                  item.upperValue,
                  item.result,
                  item.status
                )
              );
              setSmrData(updatedSmrData);
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

  // console.log(ActDetailById);

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
              <Loading text="Data Not Found . . ." />
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
                <StatusBox name="Current" status={LstActLog.currentStatus} />
                <StatusBox
                  name="LaserMark"
                  status={LstActLog.laserMarkStatus}
                />
                <StatusBox name="QRCode" status={LstActLog.qrStatus} />
               
                <StatusBox
                  name="TotalStatus"
                  status={LstActLog.tracReporJudgementtResult}
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
                    sx={{ width: 1000, overflowX: "auto" }}
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
                      {smrData.map((row, index) => (
                        <TableRow
                          key={row.description + index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="left" component="th" scope="row">
                            <p className="font-semibold">{row.description}</p>
                          </TableCell>
                          <TableCell align="center" component="th" scope="row">
                            <p className="font-semibold">{row.lowerValue}</p>
                          </TableCell>
                          <TableCell align="center" component="th" scope="row">
                            <p className="font-semibold">{row.upperValue}</p>
                          </TableCell>
                          <TableCell align="center">
                            {row.result === "Fail" ? (
                              <p className="text-red-700 font-semibold">
                                {row.result}
                              </p>
                            ) : row.description.toLowerCase() ===
                              "sensitivity" ? (
                              parseFloat(row.result) <
                                parseFloat(row.lowerValue) ||
                                parseFloat(row.result) >
                                parseFloat(row.upperValue) ? (
                                <p className="text-red-700 font-semibold">
                                  {row.result}
                                </p>
                              ) : (
                                <p className="text-green-700 font-semibold">
                                  {row.result}
                                </p>
                              )
                            ) : (
                              <p className="text-green-700 font-semibold">
                                {row.result}
                              </p>
                            )}
                          </TableCell>
                          <TableCell align="center" component="th" scope="row">
                            {row.status.toLowerCase() === "failed" ? (
                              <p className="text-red-700 font-semibold">
                                {row.status}
                              </p>
                            ) : row.status.toLowerCase() === "passed" ? (
                              <p className="text-green-700 font-semibold">
                                {row.status}
                              </p>
                            ) :  row.status.toLowerCase() === "" ? (
                              <p className="font-semibold text-yellow-500">Exception</p>
                            ):""}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
          {/* <div className="text-gray-700 bg-gray-300 mx-2 rounded-md w-90% h-fit">
            <div className="title bg-green-500 p-2 rounded-t-md text-gray-700 font-bold">
              <p>Last Data Status</p>
            </div>
            <div className="content p-4 items-center">
              <div className="flex flex-between flex-wrap justify-start">
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 400, maxWidth: 700, overflowX: "auto" }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">
                          <p className="font-semibold">Serial_Code</p>
                        </TableCell>
                        <TableCell align="center">
                          <p className="font-semibold">Result</p>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {lstStatus.map((row) => (
                        <TableRow
                          key={row.SerialCode}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            <p className="font-semibold">{row.SerialCode}</p>
                          </TableCell>
                          <TableCell align="left">
                            {row.Result === "Fail" ? (
                              <p className="text-red-700 font-semibold">
                                {row.Result}
                              </p>
                            ) : (
                              <p className="text-green-700 font-semibold">
                                {row.Result}
                              </p>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default TraceabilityStatus;

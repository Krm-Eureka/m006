import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import HeaderLayout from "../header-component/";
import { GetLastAcousticTraceLog } from "../../services/api-service/stationData";
import Loading from "../loadingComponent";
import StatusBox from "../statusBox";

function createLstStatus(SerialCode, Result) {
  return { SerialCode, Result };
}
function createSmrData(Name, Lower, Upper, smrResult, Status) {
  return { Name, Lower, Upper, smrResult, Status };
}
const lstStatus = [
  createLstStatus("EOLT-A-382315929117", "PASS"),
  createLstStatus("EOLT-A-120885838401", "PASS"),
  createLstStatus("EOLT-A-554779049699", "PASS"),
  createLstStatus("EOLT-A-37003047849", "Fail"),
  createLstStatus("EOLT-A-529520075944", "PASS"),
];
const smrData = [
  createSmrData("Current", "-", "-", "-", "-"),
  createSmrData("Sensitivity", "-", "-", "-", "-"),
  createSmrData("THD", "-", "-", "-", "-"),
  createSmrData("Frequency", "-", "-", "-", "-"),
];
const TraceabilityStatus = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [LstActLog, setLstActLog] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await GetLastAcousticTraceLog("1", "1", setLstActLog, setLoading);
      } catch (error) {
        setError(error.message);
      }
    };
    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
  }, []);

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
                <StatusBox name="QRCode" status={LstActLog.qrStatus} />
                <StatusBox
                  name="LaserMark"
                  status={LstActLog.laserMarkStatus}
                />
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
                    sx={{ minWidth: 500, maxWidth: 800, overflowX: "auto" }}
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
                          key={row.Name + index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="left" component="th" scope="row">
                            <p className="font-semibold">{row.Name}</p>
                          </TableCell>
                          <TableCell align="center" component="th" scope="row">
                            <p className="font-semibold">{row.Lower}</p>
                          </TableCell>
                          <TableCell align="center" component="th" scope="row">
                            <p className="font-semibold">{row.Upper}</p>
                          </TableCell>
                          <TableCell align="left">
                            {row.smrResult === "Fail" ? (
                              <p className="text-red-700 font-semibold">
                                {row.smrResult}
                              </p>
                            ) : (
                              <p className="text-green-700 font-semibold">
                                {row.smrResult}
                              </p>
                            )}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <p className="font-semibold">{row.Status}</p>
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
                          key={row.SerialCode} // SerialCode is already unique
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
          </div>
        </div>
      </div>
    </>
  );
};

export default TraceabilityStatus;

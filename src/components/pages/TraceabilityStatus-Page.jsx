// import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import HeaderLayout from "../Header-Component";

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
  return (
    <>
    <HeaderLayout page="Traceability Status"/>
      <div className="content">
        {/* <div className="flex flex-between flex-wrap justify-start"> */}
        <div className=" text-gray-700 bg-gray-300 m-4 rounded-md w-90% h-fit">
          <div className="title bg-green-500 p-2 rounded-t-md font-bold">
            <p>Show Process Current of EOLTStation</p>
          </div>
          <div className="content flex flex-wrap flex-between p-4 items-center">
            <div className="m-2 flex flex-wrap justify-start">
              <div className="box flex bg-gray-400 p-4  rounded-lg w-40 text-black">
                <i className="fa-solid fa-microphone mr-4 text-3xl justify-center mt-2"></i>
                <div className="flex flex-col text-center align-middle">
                  <p>AcousticTest</p>
                  <p>PASS</p>
                </div>
              </div>
            </div>
            <div className="m-2 justify-start">
              <div className="box flex bg-gray-400 p-4  rounded-lg w-40 text-black">
                <i className="fa-solid fa-bolt mr-4 text-3xl justify-center mt-2"></i>
                <div className="flex flex-col text-center align-middle">
                  <p>Current</p>
                  <p>PASS</p>
                </div>
              </div>
            </div>
            <div className="m-2 justify-start">
              <div className={`box flex bg-gray-400 p-4  rounded-lg w-40 text-black`}>
                <i className="fa-solid fa-map-pin mr-4 text-3xl justify-center mt-2"></i>
                <div className="flex flex-col text-center align-middle">
                  <p>LaserMark</p>
                  <p>PASS</p>
                  {/* {status == "PASS" ? (
                    <p className="text-green-700 font-semibold">PASS</p>
                  ) : (
                    <p className="text-red-700 font-semibold">FAIL</p>
                  )} */}
                </div>
              </div>
            </div>
            <div className=" m-2 justify-start">
              <div className="box flex bg-gray-400 p-4  rounded-lg w-40 text-black">
                <i className="fa-solid fa-qrcode mr-4 text-3xl justify-center mt-2"></i>
                <div className="flex flex-col text-center align-middle">
                  <p>QRCode</p>
                  <p>PASS</p>
                </div>
              </div>
            </div>
            <div className=" m-2 justify-start">
              <div className="box flex bg-gray-400 p-4  rounded-lg w-40 text-black">
                <i className="fa-solid fa-border-all mr-4 text-3xl justify-center mt-2"></i>
                <div className="flex flex-col text-center align-middle">
                  <p>Total Status</p>
                  <p>PASS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        
        <div className="flex mx-2 md:flex-wrap ">
          <div className="md:mb-4 text-gray-700 bg-gray-300 mx-2 rounded-md w-90% h-fit">
            <div className="title bg-green-500 p-2 rounded-t-md font-bold">
              <p>Show Data Run Summary</p>
            </div>
            <div className="content flex flex-between p-4 items-center">
              <div className=" flex flex-between flex-wrap justify-start">
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
                      {smrData.map((row) => (
                        <TableRow
                          key={row.SerialCode}
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
                            {row.smrResult == "Fail" ? (
                              <p className=" text-red-700 font-semibold">
                                {row.smrResult}
                              </p>
                            ) : (
                              <p className=" text-green-700 font-semibold">
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
          
          <div className=" text-gray-700 bg-gray-300 mx-2 rounded-md w-90% h-fit">
            <div className="title bg-green-500 p-2 rounded-t-md font-bold">
              <p>Last Data Status</p>
            </div>
            <div className="content p-4 items-center">
              <div className=" flex flex-between flex-wrap justify-start">
                {/* <div className="box bg-slate-300 p-4 mr-2 rounded-lg w-40">
                  <i className="fa-solid fa-microphone mr-4 "></i>
                  <span>AcousticTest</span>
                </div> */}
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
                            {row.Result == "Fail" ? (
                              <p className=" text-red-700 font-semibold">
                                {row.Result}
                              </p>
                            ) : (
                              <p className=" text-green-700 font-semibold">
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
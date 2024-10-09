import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import HeaderLayout from "../Header-component";
import StatusBox from "../statusBox";

function createLstStatus(SerialCode, Result) {
  return { SerialCode, Result };
}
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

const AcousticManualRun = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [serialRun, setSerialRun] = useState("");

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
  
  const handleInputChange = (e) => {
    setSerialNumber(e.target.value);
  };

  const handleRunClick = () => {
    setSerialRun(serialNumber);
    // console.log("Running with Serial Number:", serialNumber);
  };
  return (
    <>
      <HeaderLayout page="Acoustic ManualRun" />
      <div className="content h-screen">
        <div className=" text-gray-700 bg-gray-300 m-4 rounded-md w-90% h-fit">
          <div className="title bg-green-500 p-2 rounded-t-md font-bold">
            <p>
              Show Process Current of Manual EOLTStation {">>>"}{" "}
              <span className="text-red-600 font-semibold">{serialRun}</span>
            </p>
          </div>
          <div className="mb-2 mt-4 mx-6 font-semibold">
            <label htmlFor="SN" >Serial Number :</label>
            <input
              id="SN"
              className="mx-2 p-2 rounded-md w-96"
              type="text"
              placeholder="Serial Number"
              value={serialNumber}
              onChange={handleInputChange}
            />
            <button
              className={`mx-2 my-1 py-2 px-4 font-semibold bg-blue-500 hover:bg-blue-700 text-white hover:text-white h-fit w-fit border rounded-btn`}
              onClick={handleRunClick}
            >
              Run
            </button>
          </div>
          <div className="content flex flex-wrap flex-between p-4 items-center">
            <StatusBox name="test" status={0}/>
            <StatusBox name="test" status={1}/>
            <StatusBox name="test" status={2}/>
            <StatusBox name="test" status={3}/>
            <StatusBox name="test" status={4}/>
           
          </div>
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
                      {smrData.map((row,idx) => (
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
          <div className=" text-gray-700 bg-gray-300 mx-2 rounded-md w-90% h-fit">
            <div className="title bg-green-500 p-2 rounded-t-md text-gray-700 font-bold">
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

export default AcousticManualRun;

import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import HeaderLayout from "../Header-Component";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const columns = [
  { id: "Device", label: "Device" },
  { id: "Date", label: "Date" },
  { id: "TotalStatus", label: "Total Status" },
  { id: "Current", label: "Current" },
  { id: "CurrentJud", label: "Current Judgment" },
  { id: "Sensitivity", label: "Sensitivity" },
  { id: "SensitivityJud", label: "Sensitivity Judgment" },
  { id: "THD", label: "THD" },
  { id: "THDName", label: "THD Name" },
  { id: "THDMin", label: "THD Min" },
  { id: "THDMax", label: "THD Max" },
  { id: "THDResult", label: "THD Result" },
  { id: "THDJud", label: "THD Judgment" },
  { id: "Name4", label: "Name 4" },
  { id: "Measurement4", label: "Measurement 4" },
  { id: "Status4", label: "Status 4" },
  { id: "Flag", label: "Flag" },
  { id: "CreateDate", label: "Create Date" },
];

function createData(
  id,
  Device,
  Date,
  TotalStatus,
  Current,
  CurrentJud,
  Sensitivity,
  SensitivityJud,
  THD,
  THDName,
  THDMin,
  THDMax,
  THDResult,
  THDJud,
  Name4,
  Measurement4,
  Status4,
  Flag,
  CreateDate
) {
  return {
    id,
    Device,
    Date,
    TotalStatus,
    Current,
    CurrentJud,
    Sensitivity,
    SensitivityJud,
    THD,
    THDName,
    THDMin,
    THDMax,
    THDResult,
    THDJud,
    Name4,
    Measurement4,
    Status4,
    Flag,
    CreateDate,
  };
}

const rows = [
  createData(
    1,
    "Device A",
    "2024-09-10",
    "Status 1",
    10,
    "Good",
    0.5,
    "High",
    2.0,
    "THD 1",
    0.1,
    5.0,
    "Pass",
    "Judged",
    "Name 4",
    "Measurement 4",
    "Status 4",
    "Flag A",
    "2024-09-01"
  ),
  createData(
    2,
    "Device A",
    "2024-09-10",
    "Status 1",
    10,
    "Good",
    0.5,
    "High",
    2.0,
    "THD 1",
    0.1,
    5.0,
    "Pass",
    "Judged",
    "Name 4",
    "Measurement 4",
    "Status 4",
    "Flag A",
    "2024-09-01"
  ),
  createData(
    3,
    "Device A",
    "2024-09-10",
    "Status 1",
    10,
    "Good",
    0.5,
    "High",
    2.0,
    "THD 1",
    0.1,
    5.0,
    "Pass",
    "Judged",
    "Name 4",
    "Measurement 4",
    "Status 4",
    "Flag A",
    "2024-09-01"
  ),
  createData(
    4,
    "Device A",
    "2024-09-10",
    "Status 1",
    10,
    "Good",
    0.5,
    "High",
    2.0,
    "THD 1",
    0.1,
    5.0,
    "Pass",
    "Judged",
    "Name 4",
    "Measurement 4",
    "Status 4",
    "Flag A",
    "2024-09-01"
  ),
  createData(
    5,
    "Device A",
    "2024-09-10",
    "Status 1",
    10,
    "Good",
    0.5,
    "High",
    2.0,
    "THD 1",
    0.1,
    5.0,
    "Pass",
    "Judged",
    "Name 4",
    "Measurement 4",
    "Status 4",
    "Flag A",
    "2024-09-01"
  ),
  createData(
    6,
    "Device A",
    "2024-09-10",
    "Status 1",
    10,
    "Good",
    0.5,
    "High",
    2.0,
    "THD 1",
    0.1,
    5.0,
    "Pass",
    "Judged",
    "Name 4",
    "Measurement 4",
    "Status 4",
    "Flag A",
    "2024-09-01"
  ),
  createData(
    7,
    "Device A",
    "2024-09-10",
    "Status 1",
    10,
    "Good",
    0.5,
    "High",
    2.0,
    "THD 1",
    0.1,
    5.0,
    "Pass",
    "Judged",
    "Name 4",
    "Measurement 4",
    "Status 4",
    "Flag A",
    "2024-09-01"
  ),
  // Add more data rows here as needed
];

// const ResponsiveTableContainer = styled(TableContainer)({
//   overflowX: "auto",
//   "@media (max-width: 600px)": {
//     fontSize: "0.75rem",
//   },
//   "@media (min-width: 300px) and (max-width: 500px)": {
//     fontSize: "0.85rem",
//   },
// });

const TraceabilityReport = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <HeaderLayout page="Traceability Report" />
      <div className="flex flex-col text-gray-700 bg-gray-300 m-4 rounded-md w-90% h-fit">
        <div className="title bg-green-500 p-2 rounded-t-md font-bold">
          <p>Show Process Current of EOLTStation</p>
        </div>
        <div className="flex flex-wrap mx-4 py-2 items-center justify-center">
          <div className="mx-2 mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              DeviceID / SerialCode
            </label>
            <input
              type="text"
              id="DeviceID_SerialCode"
              className="w-60 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="DeviceID / SerialCode"
            />
          </div>
          <div className="justify-items-center">
            <button className="mx-2  py-1 px-2 bg-green-500 hover:bg-green-700 text-gray-900 hover:text-white h-fit w-fit border border-green-500 rounded-btn">
              EXPORT
            </button>
            <button className="mx-2  py-1 px-2 bg-blue-500 hover:bg-blue-700 text-gray-900 hover:text-white h-fit w-fit border border-blue-500 rounded-btn">
              CLEAR
            </button>
          </div>
        </div>
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: "98%",
            marginX: 1.5,
            "@media (min-width:750px)": {
              maxWidth: "35%",
            },
            "@media (min-width:800px)": {
              maxWidth: "96%",
              margin: 2,
            },
            "@media (min-width:1000px)": {
              // minWidth: "40%",
              maxWidth: "97%",
            },
            "@media (min-width:1200px)": {
              // minWidth: "71%",
              maxWidth: "70%",
            },
            // "@media (min-width:1500px)": {
            //   minWidth: "81%",
            //   maxWidth: "76%",
            // },
            "@media (min-width:1900px)": {
              // minWidth: "87%",
              maxWidth: "98.5%",
            },
          }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow className="">
                {columns.map((column) => (
                  <StyledTableCell key={column.id}>
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <StyledTableRow key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell key={column.id} align="left">
                          {value}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20, 50]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </>
  );
};

export default TraceabilityReport;

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
import * as XLSX from "xlsx";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
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
  { id: "TotalStatus", label: "TotalStatus" },
  { id: "Current", label: "Current" },
  { id: "CurrentJud", label: "CurrentJudgment" },
  { id: "Sensitivity", label: "Sensitivity" },
  { id: "SensitivityJud", label: "SensitivityJudgment" },
  { id: "THD", label: "THD" },
  { id: "THDName", label: "THDName" },
  { id: "THDMin", label: "THDMin" },
  { id: "THDMax", label: "THDMax" },
  { id: "THDResult", label: "THDResult" },
  { id: "THDJud", label: "THDJudgment" },
  { id: "Name4", label: "Name" },
  { id: "Measurement4", label: "Measurement" },
  { id: "Status4", label: "Status" },
  { id: "Flag", label: "Flag" },
  { id: "CreateDate", label: "CreateDate" },
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
    "Device B",
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
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // Filter the rows based on the search term
  // Filter rows based on search term
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Export filtered data to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredRows);
    const workbook = XLSX.utils.book_new();
    // console.log(workbook)
    XLSX.utils.book_append_sheet(workbook, worksheet, "Traceability Report");
    XLSX.writeFile(workbook, "traceability_report.xlsx");
  };
  // const exportAllToExcel = () => {
  //   const worksheet = XLSX.utils.json_to_sheet(filteredRows); // Convert filtered rows to Excel format
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Traceability Report");
  //   XLSX.writeFile(workbook, "traceability_report.xlsx");
  // };
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
      <div className="flex flex-col text-gray-700 bg-gray-300 m-4 rounded-md w-90% h-fit over">
        <div className="title bg-green-500 p-2 rounded-t-md font-bold">
          <p>Show Process Current of EOLTStation</p>
        </div>
        <div className="flex flex-wrap mx-4 py-2 h-fit items-center justify-center">
          <div className="mx-2 mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-800">
              DeviceID / SerialCode
            </label>
            <input
              type="text"
              id="DeviceID_SerialCode"
              value={searchTerm}
              onChange={handleSearchChange}
              className="sm:min-w-20 md:min-w-60 lg:min-w-80 p-2.5 m-2 rounded-md w-80 h-10 mx-2 bg-gray-50 dark:text-gray-900 dark:border-gray-600 dark:placeholder-gray-400"
              placeholder="DeviceID / SerialCode"
            />
          </div>
          <div className="justify-items-center mx-2 mt-3">
            <button
              disabled={!searchTerm}
              onClick={exportToExcel}
              className={`mx-2 my-1 py-1 px-2 ${
                !searchTerm ? "hidden" : ""
              } bg-green-500 hover:bg-green-700 text-gray-900 hover:text-white h-fit w-fit border  rounded-btn`}
            >
              EXPORT
            </button>
            <button
              disabled={searchTerm}
              onClick={exportToExcel}
              className={`mx-2 my-1 py-1 px-2 ${
                searchTerm ? "hidden" : ""
              } bg-blue-500 hover:bg-blue-600 text-gray-900 hover:text-white h-fit w-fit border  rounded-btn`}
            >
              EXPORT ALL
            </button>
            <button
              className={`mx-2 my-1 py-1 px-2 ${
                !searchTerm ? "hidden" : ""
              } bg-red-500 hover:bg-red-700 text-gray-900 hover:text-white h-fit w-fit border  rounded-btn`}
            >
              CLEAR
            </button>
          </div>
        </div>
        <div className="px-8">
        <TablePagination
            rowsPerPageOptions={[5, 10, 20, 50]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        <TableContainer component={Paper} sx={{
                maxHeight: 600,
                overflowY: "scroll",
                overflowX: "scroll",
              }}>
          
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell key={column.id}>
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
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
        </TableContainer>
        </div>
      </div>
    </>
  );
};

export default TraceabilityReport;

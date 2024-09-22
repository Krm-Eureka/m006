import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import HeaderLayout from "../Header-component";
// import * as XLSX from "xlsx";
import { formatDateTime } from "../../services/formatTimeStamp";
import { TableSortLabel } from "@mui/material";
import { FitScreen } from "@mui/icons-material";
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const columns = [
  { id: "Device", label: "Device", sortable: true , aln: "center"},
  { id: "Date", label: "Date", sortable: true, w: 200, aln: "center" },
  {
    id: "TotalStatus",
    label: "TotalStatus",
    sortable: true,
    w: 340,
    aln: "center",
  },
  { id: "Current", label: "Current", sortable: true },
  { id: "CurrentJud", label: "CurrentJudgment", sortable: true },
  { id: "Sensitivity", label: "Sensitivity", sortable: true },
  { id: "SensitivityJud", label: "SensitivityJudgment", sortable: true },
  { id: "THD", label: "THD", sortable: true },
  { id: "THDName", label: "THDName", sortable: true },
  { id: "THDMin", label: "THDMin", sortable: true },
  { id: "THDMax", label: "THDMax", sortable: true },
  { id: "THDResult", label: "THDResult", sortable: true },
  { id: "THDJud", label: "THDJudgment", sortable: true },
  { id: "Name4", label: "Name", sortable: true },
  { id: "Measurement4", label: "Measurement", sortable: true },
  { id: "Status4", label: "Status", sortable: true },
  { id: "Flag", label: "Flag", sortable: true },
  { id: "CreateDate", label: "CreateDate", sortable: true },
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
    "1234568790-1122334455-020405-A-00001",
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
    "9865473780-68636791TS-220924-T-00001",
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

const TraceabilityReport = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("CreateDate");
  const [error, setError] = useState(null);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortRows = (rows, order, orderBy) => {
    return rows.slice().sort((a, b) => {
      const valueA = orderBy === "Date" ? new Date(a[orderBy]) : a[orderBy];
      const valueB = orderBy === "Date" ? new Date(b[orderBy]) : b[orderBy];

      if (order === "asc") return valueA > valueB ? 1 : -1;
      return valueA < valueB ? 1 : -1;
    });
  };

  const sortedRows = sortRows(filteredRows, order, orderBy);

  const exportToCSV = () => {
    const headers = columns.map((column) => column.label).join(",");
    const csvRows = sortedRows.map((row) =>
      columns
        .map((column) => {
          const value = row[column.id];
          return typeof value === "string"
            ? `"${value.replace(/"/g, '""')}"`
            : value;
        })
        .join(",")
    );

    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${today.getFullYear()}`;
    const csvContent = [`DATE: ${formattedDate}`, headers, ...csvRows].join(
      "\n"
    );

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `EOLT_TRC_report_${formattedDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <>
      <HeaderLayout page="Traceability Report" />
      <div className="flex flex-col text-gray-700 bg-gray-300 m-4 pb-4 rounded-md w-90% h-fit over">
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
              onClick={exportToCSV}
              className={`mx-2 my-1 py-1 px-2 ${
                !searchTerm ? "hidden" : ""
              } bg-green-500 hover:bg-green-700 text-gray-900 hover:text-white h-fit w-fit border rounded-btn`}
            >
              EXPORT
            </button>
            <button
              disabled={searchTerm}
              onClick={exportToCSV}
              className={`mx-2 my-1 py-1 px-2 ${
                searchTerm ? "hidden" : ""
              } bg-blue-500 hover:bg-blue-600 text-gray-900 hover:text-white h-fit w-fit border rounded-btn`}
            >
              EXPORT ALL
            </button>
            <button
              onClick={clearSearch}
              className={`mx-2 my-1 py-1 px-2 ${
                !searchTerm ? "hidden" : ""
              } bg-red-500 hover:bg-red-700 text-gray-900 hover:text-white h-fit w-fit border rounded-btn`}
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
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 600, overflowY: "scroll", overflowX: "scroll" }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      sx={{ minWidth: column.w }}
                      align={column.aln}
                    >
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={() => handleRequestSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {sortedRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <StyledTableRow key={row.id}>
                      {columns.map((column) => {
                        const value =
                          column.id === "Date"
                            ? formatDateTime(row[column.id])
                            : row[column.id];
                        return (
                          <StyledTableCell key={column.id} align="left">
                            {value}
                          </StyledTableCell>
                        );
                      })}
                    </StyledTableRow>
                  ))}
                {sortedRows.length === 0 && (
                  <StyledTableRow>
                    <StyledTableCell colSpan={columns.length} align="center">
                      No results found.
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20, 50]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </>
  );
};

export default TraceabilityReport;

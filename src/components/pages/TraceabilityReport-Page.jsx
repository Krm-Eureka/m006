import { useState } from "react";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import HeaderLayout from "../Header-component";
import getTraceabilityDataWithDate from "../../services/api-service/traceabilityReportData";
import { formatDateTime } from "../../services/formatTimeStamp";
import { TableSortLabel } from "@mui/material";

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
  {
    id: "productionLineName",
    label: "Production",
    sortable: true,
    aln: "center",
  },
  {
    id: "serialCode",
    label: "SerialNumber",
    sortable: true,
    w: 340,
    aln: "center",
  },
  {
    id: "tracReportStatus",
    label: "Status",
    sortable: true,
    aln: "center",
  },
  {
    id: "tracReporJudgementtResult",
    label: "Judgement",
    aln: "center",
    sortable: true,
  },
  // { id: "SensitivityJud", label: "SensitivityJudgment", sortable: true },
  {
    id: "acousticStatus",
    label: "AcousticStatus",
    aln: "center",
    sortable: true,
  },
  {
    id: "laserMarkStatus",
    label: "LaserMarkStatus",
    aln: "center",
    sortable: true,
  },
  { id: "qrStatus", label: "QrStatus", w: 50, aln: "center", sortable: true },
  {
    id: "lastUpdateDate",
    label: "Date",
    w: 200,
    sortable: true,
    aln: "center",
  },
];

const TraceabilityReport = () => {
  const today = new Date().toISOString().split("T")[0];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("lastUpdateDate");
  const [fromDate, setFromDate] = useState(today);
  const [rows, setRows] = useState([]);
  const [toDate, setToDate] = useState(today);
  const [error, setError] = useState(null);
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const sortRows = (rows, order, orderBy) => {
    return rows.slice().sort((a, b) => {
      const valueA = a[orderBy];
      const valueB = b[orderBy];

      if (Date.parse(valueA) && Date.parse(valueB)) {
        return order === "asc"
          ? new Date(valueA) - new Date(valueB)
          : new Date(valueB) - new Date(valueA);
      }
      return order === "asc"
        ? valueA > valueB
          ? 1
          : -1
        : valueA < valueB
        ? 1
        : -1;
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
    setFromDate("");
    setToDate("");
  };
  const searchWithDate = async () => {
    try {
      await getTraceabilityDataWithDate("1", fromDate, toDate, setRows);
    } catch (err) {
      setError(err);
    }
  };

  const filteredRows = rows.filter((row) => {
    const rowDate = new Date(row.lastUpdateDate);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    if (from) {
      from.setHours(0, 0, 0, 0);
    }
    if (to) {
      to.setHours(23, 59, 59, 999);
    }
    const isDateInRange = (!from || rowDate >= from) && (!to || rowDate <= to);
    const isSearchMatch =
      searchTerm === "" ||
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );

    return isDateInRange && isSearchMatch;
  });

  const sortedRows = sortRows(filteredRows, order, orderBy);

  const exportToCSV = () => {
    const headers = columns.map((column) => column.label).join(",");
    const csvRows = sortedRows.map((row) => {
      return columns
        .map((column) => {
          const value = row[column.id];
          return typeof value === "string"
            ? `"${value.replace(/"/g, '""')}"`
            : value;
        })
        .join(",");
    });

    const fromData = new Date(fromDate);
    const toData = new Date(toDate);
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${today.getFullYear()}`;
    const formattedFromDate = `${String(fromData.getDate()).padStart(
      2,
      "0"
    )}-${String(fromData.getMonth() + 1).padStart(
      2,
      "0"
    )}-${fromData.getFullYear()}`;
    const formattedToDate = `${String(toData.getDate()).padStart(
      2,
      "0"
    )}-${String(toData.getMonth() + 1).padStart(
      2,
      "0"
    )}-${toData.getFullYear()}`;

    const csvContent = [
      `DATE : ${formattedFromDate} To ${formattedToDate}`,
      "",
      headers,
      ...csvRows,
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `EOLT_report_${formattedDate}.csv`;
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
              SerialNumber
            </label>
            <input
              type="text"
              className="rounded-md h-9 text-sm border-gray-400 w-50 p-2"
              placeholder="SerialNumber..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="mx-2 mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-800">
              From Date
            </label>
            <input
              type="date"
              className="rounded-md h-9 text-sm border-gray-400 w-50 p-2"
              value={fromDate}
              onChange={handleFromDateChange}
            />
          </div>
          <div className="mx-2 mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-800">
              To Date
            </label>
            <input
              type="date"
              className="rounded-md h-9 text-sm border-gray-400 w-50 p-2"
              value={toDate}
              onChange={handleToDateChange}
            />
          </div>
          <div className="justify-items-center mx-2 mt-3">
            <button
              onClick={searchWithDate}
              className="mx-2 my-1 py-1 px-2 bg-green-500 hover:bg-green-700 text-gray-900 hover:text-white h-fit w-fit border rounded-btn"
            >
              Search
            </button>

            <button
              onClick={exportToCSV}
              className={`mx-2 my-1 py-1 px-2 ${
                !searchTerm ? "hidden" : ""
              } bg-blue-500 hover:bg-blue-700 text-gray-900 hover:text-white h-fit w-fit border rounded-btn`}
            >
              EXPORT
            </button>

            <button
              onClick={exportToCSV}
              className={`mx-2 my-1 py-1 px-2 ${
                searchTerm ? "hidden" : ""
              } bg-blue-500 hover:bg-blue-600 text-gray-900 hover:text-white h-fit w-fit border rounded-btn`}
            >
              EXPORT ALL
            </button>

            <button
              onClick={handleClear}
              className={`mx-2 my-1 py-1 px-2 ${
                !searchTerm ? "hidden" : ""
              } bg-red-500 hover:bg-red-700 text-gray-900 hover:text-white h-fit w-fit border rounded-btn`}
            >
              CLEAR
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* <Paper
            
          > */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 500, 1000, 5000, 10000]}
              component="div"
              count={sortedRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
             <TableContainer
              component={Paper}
              sx={{
                maxHeight: 700,
                overflowY: "scroll",
                overflowX: "scroll",
              }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <StyledTableCell
                        key={column.id}
                        sx={{ minWidth: column.w }}
                        align={column.aln || "left"}
                        sortDirection={orderBy === column.id ? order : false}
                      >
                        {column.sortable ? (
                          <TableSortLabel
                            active={orderBy === column.id}
                            direction={orderBy === column.id ? order : "asc"}
                            onClick={() => handleRequestSort(column.id)}
                          >
                            {column.label}
                          </TableSortLabel>
                        ) : (
                          column.label
                        )}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <StyledTableRow key={row.id}>
                        {columns.map((column) => (
                          <StyledTableCell
                            key={column.id}
                            align={column.aln || "left"}
                          >
                            {column.id === "lastUpdateDate"
                              ? formatDateTime(row[column.id])
                              : row[column.id]}
                          </StyledTableCell>
                        ))}
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 500, 1000, 5000, 10000]}
              component="div"
              count={sortedRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          {/* </Paper> */}
        </div>
      </div>
    </>
  );
};

export default TraceabilityReport;

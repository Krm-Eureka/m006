import { useState } from "react";
import { styled } from "@mui/material/styles";
// import { useEffect } from "react";
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
import {
  formatDateTime,
  formatDateTimeSlash,
} from "../../services/formatTimeStamp";
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
    id: "id",
    label: "Serial No",
    sortable: true,
    aln: "center",
  },
  {
    id: "modelType",
    label: "Model",
    sortable: true,
    aln: "center",
  },
  {
    id: "lastUpdateDate",
    label: "Date & Time",
    w: 250,
    sortable: true,
    aln: "center",
  },
  {
    id: "tracReporJudgementtResult",
    label: "Total Jud",
    w: 200,
    aln: "center",
    sortable: true,
  },

  {
    id: "serialCode",
    label: "Laser Marking",
    sortable: true,
    w: 340,
    aln: "center",
  },
  {
    id: "qrCode",
    label: "Qr Code",
    sortable: true,
    w: 340,
    aln: "center",
  },
  {
    id: "qrJudgement",
    label: "Qr Code Jud",
    w: 200,
    sortable: true,
    aln: "center",
  },
  {
    id: "currentMin",
    label: "Current Min(mA)",
    sortable: true,
    w: 180,
    aln: "center",
  },
  {
    id: "currentMax",
    label: "Current Max(mA)",
    sortable: true,
    w: 180,
    aln: "center",
  },
  {
    id: "currentMeasured",
    label: "Current Measured(mA)",
    w: 250,
    sortable: true,
    aln: "center",
  },
  {
    id: "currentJud",
    label: "Current Jud",
    sortable: true,
    w: 200,
    aln: "center",
  },
  {
    id: "sensitivityMin",
    label: "Sensitivity Min(dBV/Pa)",
    w: 250,
    sortable: true,
    aln: "center",
  },
  {
    id: "sensitivityMax",
    label: "Sensitivity Max(dBV/Pa)",
    w: 250,
    sortable: true,
    aln: "center",
  },
  {
    id: "sensitivityResult",
    label: "Sensitivity Measured(dBV/Pa)",
    w: 250,
    sortable: true,
    aln: "center",
  },
  {
    id: "sensitivityJud",
    label: "Sensitivity Jud",
    w: 200,
    sortable: true,
    aln: "center",
  },
  { id: "thdMin", label: "THD Min(%)", sortable: true, w: 150, aln: "center" },
  { id: "thdMax", label: "THD Max(%)", sortable: true, w: 150, aln: "center" },
  {
    id: "thdResult",
    label: "THD Measured(%)",
    sortable: true,
    w: 200,
    aln: "center",
  },
  { id: "thdJud", label: "THD Jud", sortable: true, w: 200, aln: "center" },
  {
    id: "frequencyJud",
    label: "Frequency Jud",
    w: 200,
    sortable: true,
    aln: "center",
  },
  // {
  //   id: "productionLineName",
  //   label: "Production",
  //   sortable: true,
  //   aln: "center",
  // },

  // {
  //   id: "tracReportStatus",
  //   label: "TraceabilityStatus",
  //   aln: "center",
  // },
  // {
  //   id: "acousticStatus",
  //   label: "AcousticStatus",
  //   aln: "center",
  //   sortable: true,
  // },
  // {
  //   id: "laserMarkStatus",
  //   label: "LaserMarkStatus",
  //   aln: "center",
  //   sortable: true,
  // },
  // { id: "qrStatus", label: "QrStatus", w: 100, aln: "center", sortable: true },

  // {
  //   id: "creationDate",
  //   label: "Create Date",
  //   w: 250,
  //   sortable: true,
  //   aln: "center",
  // },
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
  const [serialNumber, setSerialNumber] = useState("");
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
  const mapStatus = (value) => {
    const strValue = typeof value === 'string' ? value.toLowerCase() : String(value);
    if (
      value === 0 ||
      value === 1 ||
      strValue === "fail" ||
      strValue === "failed"
    )
      return "FAIL";
    if (value === 2) return "PASS";
    if (value === 3) return "FAIL";
    return value;
  };

  const getColor = (value) => {
    if (
      value === 0 ||
      value === 1 ||
      value.toLowerCase() === "fail" ||
      value.toLowerCase() === "failed"
    )
      return "red";
    if (value === 2 || value === "PASS") return "green";
    if (value === 3 || value === "FAIL") return "red";
    return "inherit";
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSerialNumber(event.target.value);
  };

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handleClear = () => {
    setRows([]);
    setSearchTerm("");
    setFromDate("");
    setToDate("");
  };
  const searchWithDate = async () => {
    try {
      await getTraceabilityDataWithDate(
        "1",
        fromDate,
        toDate,
        serialNumber,
        setRows
      );
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
    const isSerialMatch =
      !serialNumber || row.serialCode.includes(serialNumber);

    return isDateInRange && isSearchMatch && isSerialMatch;
  });

  const sortedRows = sortRows(filteredRows, order, orderBy);
  const toFixedTwo = (value) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      // console.log(numericValue.toFixed(2));
      return (value = numericValue.toFixed(2));
    } else {
      console.warn(`Cannot convert to number: ${value}`);
      return value;
    }
  };
  const exportToCSV = () => {
    const headers = columns.map((column) => `"${column.label}"`).join(",");

    const csvRows = filteredRows.map((row) => {
      return columns
        .map((column) => {
          let value = row[column.id];

          if (column.id === "lastUpdateDate" || column.id === "creationDate") {
            value = formatDateTimeSlash(value);
          }
          if (
            column.id === "sensitivityResult" ||
            column.id === "thdResult" ||
            column.id === "currentMeasured"
          ) {
            value = toFixedTwo(value);
          }
          if (
            column.id === "currentJud" ||
            column.id.includes("Jud") ||
            column.id.includes("Status")
          ) {
            return column.id.includes("Jud") || column.id.includes("Status")
              ? mapStatus(value)
              : value;
          }

          return typeof value === "string"
            ? `"${value.replace(/"/g, '""')}"`
            : value || "";
        })
        .join(",");
    });

    const today = new Date();

    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    let hours = today.getHours();
    const minutes = String(today.getMinutes()).padStart(2, "0");
    const seconds = String(today.getSeconds()).padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, "0") : "12";

    const formattedDate = `${day}_${month}_${year}_${hours}_${minutes}_${seconds} ${ampm}`;

    const csvContent = [
      `"Traceability Report"`,
      `"Date From : ${fromDate}" `,
      `"Date To   : ${toDate}"`,
      "",
      headers,
      ...csvRows,
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `TraceabilityReport_${formattedDate}.csv`;
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
  {
    error && (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error.message}</span>
      </div>
    );
  }
  return (
    <>
      <HeaderLayout page="Traceability Report" />
      <div className="flex flex-col text-gray-700 bg-gray-300 m-4 pb-4 rounded-md w-90% h-fit over">
        <div className="title bg-green-500 p-2 rounded-t-md font-bold">
          <p>Traceability Report of EOLTStation</p>
        </div>
        <div className="flex flex-wrap mx-4 py-2 h-fit items-center justify-center">
          <div className="mx-2 mb-2">
            {rows && rows.length > 0 ? (
              <>
                <label
                  htmlFor="serialNumber"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-800"
                >
                  Serial Number
                </label>
                <input
                  type="text"
                  id="serialNumber"
                  className="rounded-md h-9 text-sm border-gray-400 w-50 p-2"
                  placeholder="Serial Number..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </>
            ) : (
              ""
            )}
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
              onClick={handleClear}
              className={`mx-2 my-1 py-1 px-2  bg-red-500 hover:bg-red-700 text-gray-900 hover:text-white h-fit w-fit border rounded-btn`}
            >
              CLEAR
            </button>
            {rows && rows.length > 0 ? (
              <>
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
              </>
            ) : (
              ""
            )}
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
                      align={column.aln || "center"}
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
                          style={{
                            color:
                              column.id === "thdJud" ||
                              column.id === "frequencyJud" ||
                              column.id === "sensitivityJud" ||
                              column.id === "laserMarkStatus" ||
                              column.id === "creationDate" ||
                              column.id === "qrJudgement" ||
                              column.id === "currentJud" ||
                              column.id === "tracReportStatus" ||
                              column.id === "tracReporJudgementtResult" ||
                              column.id === "qrStatus" ||
                              column.id === "acousticStatus"
                                ? getColor(row[column.id])
                                : "inherit",
                          }}
                        >
                          {column.id === "lastUpdateDate" ||
                          column.id === "creationDate"
                            ? formatDateTimeSlash(row[column.id])
                            : column.id === "sensitivityResult" ||
                              column.id === "thdResult" ||
                              column.id === "currentMeasured"
                            ? toFixedTwo(row[column.id])
                            : mapStatus(row[column.id])}
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

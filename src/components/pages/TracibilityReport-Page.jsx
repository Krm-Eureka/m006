import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { styled } from "@mui/material/styles";

const columns = [
  { id: "Device", label: "Device", width: "15%" },
  { id: "Date", label: "Date", width: "15%" },
  { id: "TotalStatus", label: "Total Status", width: "15%" },
  { id: "Current", label: "Current", width: "10%" },
  { id: "CurrentJud", label: "Current Judgment", width: "10%" },
  { id: "Sensitivity", label: "Sensitivity", width: "10%" },
  { id: "SensitivityJud", label: "Sensitivity Judgment", width: "10%" },
  { id: "THD", label: "THD", width: "10%" },
  { id: "THDName", label: "THD Name", width: "15%" },
  { id: "THDMin", label: "THD Min", width: "10%" },
  { id: "THDMax", label: "THD Max", width: "10%" },
  { id: "THDResult", label: "THD Result", width: "15%" },
  { id: "THDJud", label: "THD Judgment", width: "15%" },
  { id: "Name4", label: "Name 4", width: "15%" },
  { id: "Maesurement4", label: "Measurement 4", width: "15%" },
  { id: "Status4", label: "Status 4", width: "10%" },
  { id: "Flag", label: "Flag", width: "10%" },
  { id: "CraeteDate", label: "Create Date", width: "15%" },
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
  Maesurement4,
  Status4,
  Flag,
  CraeteDate
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
    Maesurement4,
    Status4,
    Flag,
    CraeteDate,
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
  // Add more data rows here as needed
];

const ResponsiveTableContainer = styled(TableContainer)({
  overflowX: "scroll",
  "@media (max-width: 600px)": {
    fontSize: "0.75rem",
  },
  "@media (min-width: 300px) and (max-width: 500px)": {
    fontSize: "0.85rem",
  },
});

const TracibilityReport = () => {
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
      <div className="flex flex-col text-gray-700 bg-gray-300 m-4 p-4 rounded-md w-90% h-fit">
        <div className="search flex items-center">
          <div className="mx-2 mb-2">
            <label className="block mb-2 text-sm font-medium text-red-700 dark:text-white">
              DeviceID / SerialCode
            </label>
            <input
              type="text"
              id="DeviceID_SerialCode"
              className="w-60 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="DeviceID / SerialCode"
            />
          </div>
          <button className="mx-2 mt-4 py-2 px-4 bg-green-500 hover:bg-green-700 text-gray-900 hover:text-white h-fit w-fit border border-green-500 rounded-btn">
            EXPORT
          </button>
          <button className="mx-2 mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-gray-900 hover:text-white h-fit w-fit border border-blue-500 rounded-btn">
            CLEAR
          </button>
        </div>

        <div className="table ">
          <Paper
            sx={{
              width: "100%",
              overflow: "scroll ",

              "@media (min-width:750px)": {
                maxWidth: "35%",
              },
              "@media (min-width:800px)": {
                maxWidth: "39%",
              },
              "@media (min-width:1000px)": {
                minWidth: "40%",
                maxWidth: "50%",
              },
              "@media (min-width:1200px)": {
                minWidth: "51%",
                maxWidth: "68%",
              },
              "@media (min-width:1500px)": {
                minWidth: "69%",
                maxWidth: "76%",
              },
              "@media (min-width:1900px)": {
                minWidth: "87%",
                maxWidth: "98.5%",
              },
            }}
          >
            <ResponsiveTableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align="left"
                        style={{ width: column.width }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align="left"
                              style={{ width: column.width }}
                            >
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </ResponsiveTableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </>
  );
};

export default TracibilityReport;

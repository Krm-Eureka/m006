import * as React from "react";
// import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

const columns = [
  { id: "name", label: "Name", minWidth: 50 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));
// Updated createData function
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

// Updated rows with new data structure
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
      <div className="flex flex-wrap bg-gray-300 m-4 p-4 rounded-md w-full h-fit">
        <div className="search flex items-center">
          <div className="mx-2 mb-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              DeviceID / SerialCode
            </label>
            <input
              type="text"
              id="DeviceID_SerialCode"
              // value={}
              className="w-60 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="DeviceID / SerialCode"
              //   disabled={props.disable === true? true: false}
            />
          </div>
          <button className="mx-2 mt-4 py-2 px-4  bg-green-500 hover:bg-green-700 text-gray-900 hover:text-white h-fit w-fit border border-green-500 rounded-btn">
            EXPORT
          </button>
          <button className="mx-2 mt-4 py-2 px-4  bg-blue-500 hover:bg-blue-700 text-gray-900 hover:text-white h-fit w-fit border border-blue-500 rounded-btn">
            CLEAR
          </button>
        </div>

        <div className="table w-auto overflow-x-auto">
          {/* <Paper
            sx={{ minWidth: "650px", maxWidth: "1100px", overflow: "hidden" }}
          > */}
          <Paper
        sx={{
          width: '100%',
          overflow: 'hidden',
          // Responsive adjustments
          '@media (min-width:600px)': {
            maxWidth: '90%',
          },
          '@media (min-width:900px)': {
            maxWidth: '80%',
          },
          '@media (min-width:1200px)': {
            maxWidth: '70%',
          },
        }}
      >
            <TableContainer sx={{ maxHeight: 500 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
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

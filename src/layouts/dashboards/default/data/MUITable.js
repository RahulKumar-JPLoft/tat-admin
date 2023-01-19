import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function MUITable({ tableData, label }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table" stickyHeader>
        <TableHead style={{ display: "contents" }} >
          <p
            align="center"
            style={{ fontFamily: "roboto", fontWeight: 600 }}
            
          >
            Top 5 {label?.Name}
          </p>
          <TableRow>
            <TableCell>{label?.Name}</TableCell>
            <TableCell align="right">Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData == "N/A" ? (
            <center>
              {" "}
              <img
                src="https://i.pinimg.com/originals/43/c7/a0/43c7a0928088b901910ab187816c8f65.gif"
                alt="avatar"
                width={80}
                height={60}
              />
            </center>
          ) : (
            tableData?.map((row, index) => (
              <TableRow
                key={index.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.label ? row.label : "N/A"}
                </TableCell>
                <TableCell align="right">{row.data}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

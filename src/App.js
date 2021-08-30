import React, { useState } from "react";
import Card from "./components/Card";
import ErrorModal from "./components/ErrorModal";
import Wrapper from "./helpers/Wrapper";
import { TablePagination, TableContainer, TableFooter, TableRow, Table, TableBody, TableCell, TableHead } from "@material-ui/core";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import classes from './App.module.css';

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

function App() {

  const styles = useStyles2();
  const [error, setError] = useState()
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const errorHandler = () => {
    setError(null);
  }

  return (
    <Wrapper>

      {error && <ErrorModal title="TITULO" message="Mensaje aqui" onConfirm={errorHandler} />}
      <Card className={classes.input}>
      <h2>title</h2>
        <TableContainer component={Paper}>
          <Table className={styles.table}>
            <TableHead>
              <StyledTableCell>Item Serving</StyledTableCell>
              <StyledTableCell align="right">Calories</StyledTableCell>
              <StyledTableCell align="right">Size</StyledTableCell>
            </TableHead>

            <TableBody>
              {
                (rowsPerPage > 0
                  ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : rows
                ).map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {row.calories}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {row.fat}
                    </TableCell>
                  </TableRow>
                ))
              }
              {
                emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )
              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={12}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>

    </Wrapper>
  )
}

export default App;

import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 15
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
}));

function MaterialTable(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {props.titles.map(title => (
              <StyledTableCell key={title[0]} align="center">
                {title[0]}
              </StyledTableCell>
            ))}
            {props.select ? (
              <StyledTableCell align="center">Seleccionar</StyledTableCell>
            ) : props.edit === undefined ? (
              <React.Fragment>
                <StyledTableCell align="center">Detalles</StyledTableCell>
                <StyledTableCell align="center">Editar</StyledTableCell>
                <StyledTableCell align="center">Eliminar</StyledTableCell>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <StyledTableCell align="center">Detalles</StyledTableCell>
                <StyledTableCell align="center">Eliminar</StyledTableCell>
              </React.Fragment>
            )}
          </TableRow>
          <TableRow>
            {props.titles.map(title => (
              <TableCell key={title[1]} align="center" padding="none">
                <TextField
                  align="center"
                  placeholder={title[0]}
                  type="search"
                  variant="outlined"
                  name={title[1].split(".")[0]}
                  inputProps={{ style: { textAlign: "center" }, autoComplete: "off" }}
                  onChange={props.handleSearch}
                />
              </TableCell>
            ))}
            {props.select ? (
              <TableCell />
            ) : props.edit === undefined ? (
              <React.Fragment>
                <TableCell />
                <TableCell />
                <TableCell />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <TableCell />
                <TableCell />
              </React.Fragment>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.loading ? (
            <StyledTableRow>
              <StyledTableCell align="center">
                <CircularProgress />
              </StyledTableCell>
            </StyledTableRow>
          ) : props.error ? (
            <StyledTableRow>
              <StyledTableCell align="center">Error {props.error.message}</StyledTableCell>
            </StyledTableRow>
          ) : (
            props.data.map(row => (
              <StyledTableRow key={row[0]}>
                {row.map(cell => (
                  <StyledTableCell key={cell} align="center">
                    {cell}
                  </StyledTableCell>
                ))}

                {props.select ? (
                  <StyledTableCell align="center">
                    <Fab
                      className="bg-primary"
                      size="small"
                      style={{ color: "white" }}
                      onClick={() => props.selectRelation(row[0][0], row[1][0])}
                    >
                      <Icon className="fas fa-check" />
                    </Fab>
                  </StyledTableCell>
                ) : props.edit === undefined ? (
                  <React.Fragment>
                    <StyledTableCell align="center">
                      <Link to={"/" + props.currentUrl + "/" + row[0] + "?mode=read"}>
                        <Fab size="small">
                          <Icon className="fas fa-search" />
                        </Fab>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Link to={"/" + props.currentUrl + "/" + row[0] + "?mode=update"}>
                        <Fab className="bg-warning" size="small">
                          <Icon>edit_icon</Icon>
                        </Fab>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Link to={"/" + props.currentUrl + "/" + row[0] + "?mode=delete"}>
                        <Fab color="secondary" size="small">
                          <Icon>delete_icon</Icon>
                        </Fab>
                      </Link>
                    </StyledTableCell>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <StyledTableCell align="center">
                      <Link to={"/" + props.currentUrl + "/" + row[0] + "?mode=read"}>
                        <Fab size="small">
                          <Icon className="fas fa-search" />
                        </Fab>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Link to={"/" + props.currentUrl + "/" + row[0] + "?mode=delete"}>
                        <Fab color="secondary" size="small">
                          <Icon>delete_icon</Icon>
                        </Fab>
                      </Link>
                    </StyledTableCell>
                  </React.Fragment>
                )}
              </StyledTableRow>
            ))
          )}
        </TableBody>
        <TableFooter classes={classes.footer}>
          <TableRow align="left">
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              colSpan={0}
              count={props.totalRecords}
              rowsPerPage={props.pageSize}
              page={props.pageNumber - 1}
              SelectProps={{
                native: true
              }}
              onChangePage={props.handleChangePage}
              onChangeRowsPerPage={props.handleChangeRowsPerPage}
              labelRowsPerPage="Filas por página"
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  );
}

export default MaterialTable;

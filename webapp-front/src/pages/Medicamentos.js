import React from "react";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import MaterialTable from "../components/MaterialTable.js";
import handleSearch from "../functions/handleSearch";
import handleChangePage from "../functions/handleChangePage";
import handleChangeRowsPerPage from "../functions/handleChangeRowsPerPage";
import getData from "../functions/getData";

class Medicamentos extends React.Component {
  state = {
    currentUrl: "medicamentos",
    titles: [
      ["ID", "id"],
      ["Nombre", "name"],
      ["Droga", "drug.name"],
      ["Proporción (mg)", "proportion"],
      ["Presentación", "presentation"],
      ["Laboratorio", "laboratory"],
      ["En Stock", "stock"]
    ],
    loading: true,
    error: null,
    data: [],
    pageSize: 5,
    pageNumber: 1,
    totalRecords: 0,
    order: "name",
    search: {
      id: "",
      name: "",
      drug: "",
      proportion: "",
      presentation: "",
      laboratory: ""
    },
    searchString: ""
  };

  abortController = new AbortController();
  getData = getData.bind(this);
  handleSearch = handleSearch.bind(this);
  handleChangePage = handleChangePage.bind(this);
  handleChangeRowsPerPage = handleChangeRowsPerPage.bind(this);

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    this.props.history.listen(location => {
      location.pathname === "/" + this.state.currentUrl && this.getData();
    });
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    return (
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid item>
            <h1>Medicamentos</h1>
          </Grid>
          <Grid item>
            <Link to={"/" + this.state.currentUrl + "/añadir"}>
              <Fab color="primary" size="medium">
                <AddIcon />
              </Fab>
            </Link>
          </Grid>
        </Grid>

        <MaterialTable
          titles={this.state.titles}
          data={this.state.data}
          currentUrl={this.state.currentUrl}
          loading={this.state.loading}
          error={this.state.error}
          handleSearch={this.handleSearch}
          pageSize={this.state.pageSize}
          pageNumber={this.state.pageNumber}
          totalRecords={this.state.totalRecords}
          handleChangePage={this.handleChangePage}
          handleChangeRowsPerPage={this.handleChangeRowsPerPage}
          select={this.props.select}
          selectRelation={this.props.selectRelation}
        />
      </React.Fragment>
    );
  }
}

export default Medicamentos;

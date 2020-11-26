import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ButtonsRow from "../components/ButtonsRow";
import changeMode from "../functions/changeMode";
import handleSubmit from "../functions/handleSubmit";
import handleChange from "../functions/handleChange";

class DrogasDetalles extends React.Component {
  state = {
    currentUrl: "drogas",
    mode: "read",
    loading: false,
    form: { id: 0, name: "" }
  };
  changeMode = changeMode.bind(this);
  handleSubmit = handleSubmit.bind(this);
  handleChange = handleChange.bind(this);

  async getData() {
    const response = await fetch(
      window.ApiUrl + this.state.currentUrl + "/" + this.props.match.params.id
    );
    const data = await response.json();
    this.setState({
      form: {
        id: data.id,
        name: data.name
      }
    });
  }

  componentDidMount() {
    if (this.props.match.params.id !== "añadir") {
      this.getData();
    }
    this.changeMode();
  }

  componentDidUpdate() {
    this.props.history.listen(location => this.changeMode());
  }

  render() {
    return (
      <div>
        <Grid container direction="column">
          <Grid container direction="row" justify="center" className="mt-5">
            <Grid item>
              <h1>Drogas</h1>
            </Grid>
          </Grid>
          <form onSubmit={this.handleSubmit}>
            {this.state.mode !== "create" && (
              <Grid container direction="row" justify="center" className="mt-3">
                <Grid item>
                  <TextField
                    label="ID"
                    margin="normal"
                    variant="outlined"
                    name="id"
                    value={this.state.form.id}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            )}
            <Grid container direction="row" justify="center">
              <Grid item>
                <TextField
                  required
                  label="Nombre"
                  margin="normal"
                  variant="outlined"
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.form.name}
                  InputProps={{
                    readOnly:
                      this.state.mode === "read" || this.state.mode === "delete"
                  }}
                />
              </Grid>
            </Grid>
            <ButtonsRow
              id={this.props.match.params.id}
              mode={this.state.mode}
              history={this.props.history}
              loading={this.state.loading}
            />
          </form>
        </Grid>
      </div>
    );
  }
}

export default DrogasDetalles;

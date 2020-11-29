import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import ButtonsRow from '../components/ButtonsRow';
import changeMode from '../functions/changeMode';
import handleSubmit from '../functions/handleSubmit';
import handleChange from '../functions/handleChange';
import RelationshipModal from '../components/RelationshipModal';

class MedicamentosDetalles extends React.Component {
  state = {
    currentUrl: 'medicines',
    mode: 'read',
    loading: false,
    form: {
      id: 0,
      name: '',
      drugId: '',
      drugName: '',
      proportion: 0,
      presentation: '',
      laboratory: '',
      stock: 0,
    },
    drugs: [],
    modalShow: false,
  };

  changeMode = changeMode.bind(this);
  handleSubmit = handleSubmit.bind(this);
  handleChange = handleChange.bind(this);

  async getData() {
    const response = await fetch(
      window.ApiUrl +
        this.state.currentUrl +
        '/get' +
        this.state.currentUrl.slice(0, -1) +
        '/' +
        this.props.match.params.id
    );
    const data = await response.json();
    this.setState({
      form: {
        id: data.id,
        name: data.name,
        drugId: data.drug.id,
        drugName: data.drug.name,
        proportion: data.proportion,
        presentation: data.presentation,
        laboratory: data.laboratory,
        stock: data.stock,
      },
    });
  }

  selectRelation = (id, name) => {
    this.setState({
      modalShow: false,
      form: {
        ...this.state.form,
        drugId: id,
        drugName: name,
      },
    });
  };

  componentDidMount() {
    if (this.props.match.params.id !== 'añadir') {
      this.getData();
    }
    this.changeMode();
  }

  componentDidUpdate() {
    this.props.history.listen((location) => this.changeMode());
  }

  render() {
    return (
      <div>
        <Grid container direction="column">
          <Grid container direction="row" justify="center" className="mt-5">
            <Grid item>
              <h1>Medicamentos</h1>
            </Grid>
          </Grid>

          <form onSubmit={this.handleSubmit}>
            {this.state.mode !== 'create' && (
              <Grid container direction="row" justify="center" spacing={5}>
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

            <Grid container direction="row" justify="center" spacing={5}>
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
                    readOnly: this.state.mode === 'read' || this.state.mode === 'delete',
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Laboratorio"
                  margin="normal"
                  variant="outlined"
                  name="laboratory"
                  onChange={this.handleChange}
                  value={this.state.form.laboratory}
                  InputProps={{
                    readOnly: this.state.mode === 'read' || this.state.mode === 'delete',
                  }}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" justify="center" spacing={5}>
              <Grid item className="mt-3">
                <TextField
                  required
                  label="Droga"
                  margin="none"
                  variant="outlined"
                  name="drugName"
                  value={this.state.form.drugName}
                  style={{ width: 145 }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Button
                  disabled={this.state.mode === 'read' || this.state.mode === 'delete'}
                  className="mt-1 px-0"
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={() => this.setState({ modalShow: true })}
                >
                  <i className="fas fa-2x fa-prescription-bottle-alt" />
                </Button>
              </Grid>
              <RelationshipModal
                show={this.state.modalShow}
                onHide={() => this.setState({ modalShow: false })}
                entity={'Drogas'}
                history={this.props.history}
                selectRelation={this.selectRelation}
              />
              <Grid item>
                <TextField
                  label="Proporción (mg)"
                  margin="normal"
                  variant="outlined"
                  name="proportion"
                  type="number"
                  onChange={this.handleChange}
                  value={this.state.form.proportion}
                  InputProps={{
                    inputProps: { min: 0 },
                    readOnly: this.state.mode === 'read' || this.state.mode === 'delete',
                  }}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" justify="center" spacing={5}>
              <Grid item className="mt-3">
                <FormControl required variant="outlined" style={{ minWidth: 210 }}>
                  <InputLabel htmlFor="presentation">Presentación</InputLabel>
                  <Select
                    id="presentation"
                    name="presentation"
                    onChange={this.handleChange}
                    value={this.state.form.presentation}
                    input={<OutlinedInput labelWidth={105} />}
                    inputProps={{
                      readOnly: this.state.mode === 'read' || this.state.mode === 'delete',
                    }}
                  >
                    <MenuItem value="Inyectable">Inyectable</MenuItem>
                    <MenuItem value="Jarabe">Jarabe</MenuItem>
                    <MenuItem value="Píldora">Píldora</MenuItem>
                    <MenuItem value="Comprimido">Comprimido</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                  label="En stock"
                  margin="normal"
                  variant="outlined"
                  name="stock"
                  onChange={this.handleChange}
                  value={this.state.form.stock}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>

            <ButtonsRow
              id={this.props.match.params.id}
              mode={this.state.mode}
              currentUrl="Medicamentos"
              location={this.props.location}
              history={this.props.history}
              loading={this.state.loading}
            />
          </form>
        </Grid>
      </div>
    );
  }
}

export default MedicamentosDetalles;

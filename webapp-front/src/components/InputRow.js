import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";

class InputRow extends React.Component {
  render() {
    return (
      <Grid container direction="row" justify="center" spacing={5}>
        <Grid item className="mt-3">
          <FormControl required variant="outlined" style={{ minWidth: 210 }}>
            <InputLabel htmlFor="medicineId">Medicamento</InputLabel>
            <Select
              id="medicineId"
              name="medicineId"
              onChange={e => this.props.handleChange(e)}
              value={this.props.element.medicineId}
              input={<OutlinedInput labelWidth={110} />}
              inputProps={{
                readOnly: this.props.mode === "read" || this.props.mode === "delete"
              }}
            >
              {Object.keys(this.props.medicines).map(key => {
                return (
                  <MenuItem key={key} value={key}>
                    {this.props.medicines[key]}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            required
            type="number"
            label="Cantidad"
            margin="normal"
            variant="outlined"
            name="quantity"
            onChange={e => this.props.handleChange(e)}
            value={this.props.element.quantity}
            InputProps={{
              readOnly: this.props.mode === "read" || this.props.mode === "delete"
            }}
          />
        </Grid>
      </Grid>
    );
  }
}

export default InputRow;

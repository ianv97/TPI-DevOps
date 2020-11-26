export default function handleChange(e) {
  this.setState({
    form: {
      ...this.state.form,
      [e.target.name]: e.target.value
    }
  });
}

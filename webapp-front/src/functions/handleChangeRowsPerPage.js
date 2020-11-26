export default function handleChangeRowsPerPage(event) {
  this.setState({ pageSize: +event.target.value, pageNumber: 1 }, () => {
    this.getData();
  });
}

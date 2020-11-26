export default function handleChangePage(event, newPage) {
  this.setState({ pageNumber: newPage + 1 }, () => {
    this.getData();
  });
}

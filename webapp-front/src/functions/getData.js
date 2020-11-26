export default async function getData() {
  this.setState({ error: null });

  try {
    let apiUrl;
    let displayData = [];
    let tempDisplayData = [];

    if (this.state.search.id) {
      apiUrl =
        window.ApiUrl + this.state.currentUrl + "/" + this.state.search.id;
    } else {
      apiUrl =
        window.ApiUrl +
        this.state.currentUrl +
        "?order=" +
        this.state.order +
        "&pageSize=" +
        this.state.pageSize +
        "&pageNumber=" +
        this.state.pageNumber;
      if (this.state.searchString) {
        apiUrl += this.state.searchString;
      }
    }
    await fetch(apiUrl, {
      signal: this.abortController.signal
    })
      .then(response => {
        if (response.ok) {
          this.setState({
            page: response.headers.get("page"),
            totalRecords: parseInt(response.headers.get("totalRecords"))
          });
          return response.json();
        } else {
          throw Error(response.status + " " + response.statusText);
        }
      })
      .then(data => {
        if (!Array.isArray(data)) {
          data = [data];
        }
        data.forEach(entity => {
          tempDisplayData = [];
          // eslint-disable-next-line
          this.state.titles.forEach(value =>
            tempDisplayData.push([eval("entity." + value[1])])
          );
          displayData.push(tempDisplayData);
        });
        this.setState({
          data: displayData
        });
      });
  } catch (error) {
    this.setState({ error: error });
  } finally {
    this.setState({ loading: false });
  }
}

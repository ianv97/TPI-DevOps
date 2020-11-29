export default async function handleSubmit(event, nextUrl = this.state.currentUrl) {
  event.preventDefault();
  this.setState({ loading: true });
  var response;
  if (this.state.mode === 'create') {
    response = await fetch(
      window.ApiUrl + this.state.currentUrl + '/post' + this.state.currentUrl.slice(0, -1),
      {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(this.state.form),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } else if (this.state.mode === 'update') {
    response = await fetch(
      window.ApiUrl +
        this.state.currentUrl +
        '/put' +
        this.state.currentUrl.slice(0, -1) +
        '/' +
        this.props.match.params.id,
      {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(this.state.form),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } else if (this.state.mode === 'delete') {
    response = await fetch(
      window.ApiUrl +
        this.state.currentUrl +
        '/delete' +
        this.state.currentUrl.slice(0, -1) +
        '/' +
        this.props.match.params.id,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  if (response.ok) {
    window.container.success('Acción realizada exitosamente', 'Éxito', {
      showAnimation: 'animated rubberBand',
      hideAnimation: 'animated flipOutX',
      timeOut: 7000,
      extendedTimeOut: 2000,
    });
  } else {
    window.container.error(response.status + ' ' + response.statusText, 'Error', {
      showAnimation: 'animated rubberBand',
      hideAnimation: 'animated flipOutX',
      timeOut: 7000,
      extendedTimeOut: 2000,
    });
  }
  this.setState({ loading: false });
  this.props.history.push('/' + nextUrl);
}

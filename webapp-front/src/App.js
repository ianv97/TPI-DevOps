import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './layout/scss/style.scss';
import GlobalStyle from './styles/GlobalStyles';
import { ToastContainer } from 'react-toastr';
import { ToastMessageAnimated } from 'react-toastr';
import 'toastr/build/toastr.css';
import 'animate.css/animate.css';
import CircularProgress from '@material-ui/core/CircularProgress';

const DefaultLayout = React.lazy(() => import('./layout/containers/DefaultLayout.js'));
const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    <CircularProgress />
  </div>
);

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <ToastContainer
          toastMessageFactory={React.createFactory(ToastMessageAnimated)}
          className="toast-top-right"
          ref={(ref) => {
            window.container = ref;
          }}
        />

        <BrowserRouter basename={'/' + process.env.REACT_APP_STAGE}>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route path="/" name="Inicio" render={(props) => <DefaultLayout {...props} />} />
            </Switch>
          </React.Suspense>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;

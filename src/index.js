import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../style/style.css';
import '../style/style.scss';
import { Home, requireAuth, requireNoAuth } from './components';
import { UserLogin } from './containers';
import store from './store';
import ReduxToastr from 'react-redux-toastr'
import 'materialize-css/dist/css/materialize.min.css';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/login" component={requireNoAuth(UserLogin)} />
            <Route path="/" component={requireAuth(Home)} />
          </Switch>
        </div>
      </BrowserRouter>
      <ReduxToastr
        progressBar />
    </div>
  </Provider>
  , document.querySelector('.container'));

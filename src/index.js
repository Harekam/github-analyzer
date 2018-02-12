import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../style/style.css';
import '../style/style.scss';
import { Home, requireAuth, requireNoAuth, About } from './components';
import { UserLogin, NavBar } from './containers';
import store from './store';
import ReduxToastr from 'react-redux-toastr'
import 'materialize-css/dist/css/materialize.min.css';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <BrowserRouter>
        <div>
          <NavBar />
          <main>
            <div className="container">
              <div className="row">
                <div className="col s12 m8 l9">
                  <Switch>
                    <Route path="/about" component={About} />
                    <Route path="/login" component={requireNoAuth(UserLogin)} />
                    <Route path="/" component={requireAuth(Home)} />
                  </Switch>
                </div>
              </div>
            </div>
          </main>
        </div>
      </BrowserRouter>
      <ReduxToastr
        progressBar />
    </div>
  </Provider>
  , document.querySelector('#body'));

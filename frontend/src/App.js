import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

import Home from './components/Home';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/forgotpassword'
import PasswordSent from './components/passwordsent'
import Userscreen from './components/userscreen'
import Menu from './components/menu'
import blank from './components/blank'
import EditProfile from './components/editprofile'
import 'bootstrap/dist/css/bootstrap.min.css';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
            <div>
              <Navbar />
                <Switch>
                  <Route exact path="/" component={ Home } />
                  <Route exact path="/register" component={ Register } />
                  <Route exact path="/login" component={ Login }/>
                  <Route exact path="/forgotpassword" component={ ForgotPassword } />
                  <Route exact path="/passwordsent" component={ PasswordSent }/>
                  <Route exact path="/userscreen" component={ Userscreen }/>
                  <Route exact path="/blank" component={ blank } />
                  <Route exact path="/menu" component={ Menu }/>
                  <Route exact path='/editprofile' component={EditProfile}/>
                </Switch>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home';
import List from './List';
import Signup from './Signup'
import Login from './Login'
import Forgotpassword from './Forgotpassword'

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/list' component={List}/>
          <Route path='/signup' component={Signup}/>
          <Route path='/login' component= {Login}/>
          <Route path='/forgotpassword' component= {Forgotpassword}/>
        </Switch>
      </div>
    )

    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import {Form, Row, Col, Button, Container} from 'react-bootstrap'
import logo from './logo.png'
import Navbar from './Navbar'
import tickmark from './tickmark.png'
import { Link } from 'react-router-dom';
import './signupcomplete.css'
import NavbarWithoutLogin from './NavbarWithoutLogin'


class SignUpComplete extends Component {

  render() {
    return (
    <div className="App">
      <NavbarWithoutLogin/>
      <br/> <br/> <br/> <br/>
      <img id="logo" src={logo} width="20%" height="20%" alt = ""/>       
      <h3 className="heading"> Sign Up Complete </h3>
      <img id="tickmark" src={tickmark} width="10%" height="10%" alt = ""/>       
      <br/> <br/> <br/>
      <div className="infocontainer">  
        <Link to={'./login'}>
          <button id="loginbtn" className="b1" >Login</button>
        </Link>  
      </div>  
      
    </div>
    );
  }
}

export default SignUpComplete;

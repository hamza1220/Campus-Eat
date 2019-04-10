import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import {Form, Row, Col, Button, Container} from 'react-bootstrap'
import logo from './logo.png'
import Navbar from './Navbar'

class Login extends Component {

  constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target)
    console.log(data)   
  
    fetch('api/form-forgotpassword', {
      method: 'POST',
      body: data,
    });

  }


  render() {
    return (
    <div className="App">
      <Navbar/>
      <br/> <br/> <br/> <br/>
      <img id="logo" src={logo} width="30%" height="30%" alt = ""/>       
      <h1 className="heading"> RESET PASSWORD </h1>
      <br/> <br/> <br/>
      <div className="infocontainer">  
        <form onSubmit={this.handleSubmit}>
          <input className="formfield" name="email" type="email" placeholder="Enter Email Address to send Password"/><br/><br/>

          <button className="b1">Send Password</button>
        </form>
        
      </div>  
      
    </div>
    );
  }
}

export default Login;

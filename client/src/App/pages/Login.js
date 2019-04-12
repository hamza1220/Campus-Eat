import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import {Form, Row, Col, Button, Container} from 'react-bootstrap'
import logo from './logo.png'
import NavbarWithoutLogin from './NavbarWithoutLogin'

class Login extends Component {

  constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target)
    console.log(data)   
  
    fetch('api/form-login', {
      method: 'POST',
      body: data,
    }).then(res => res.json())

  }


  render() {
    return (
    <div className="App">
      <NavbarWithoutLogin/>
      <br/> <br/> <br/> <br/>
      <img id="logo" src={logo} width="30%" height="30%" alt = ""/>       
      <br/><br/>
      <h1 className="heading"> LOGIN </h1>
      <p className="heading"> Login to Campus Eat and start ordering food </p>
      <br/> <br/>
      {/*<Link to={'./list'}>*/}
      <div className="infocontainer">  
        <form onSubmit={this.handleSubmit}>
          <input className="formfield" name="email" type="email" placeholder="Email Address"/><br/><br/>
          <input className="formfield" name="password" type="password" placeholder = "Password" /><br/><br/>

          <button className="b1">Login</button>
        </form>
        
        <Link to={'./forgotpassword'}>
          <small style={{color: "blue"}}><u>Forgot Password?</u></small>
        </Link>
      
      </div>  
      {/*</Link>*/}

    </div>
    );
  }
}

export default Login;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import {Form, Row, Col, Button, Container} from 'react-bootstrap'
import logo from './logo.png'
import NavbarWithoutLogin from './NavbarWithoutLogin'


class Login extends Component {

  constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: ''
      };

      this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleSubmit(event){
    
    event.preventDefault();
    
    console.log(JSON.stringify(this.state))
        
    fetch('api/form-login', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json",
      }
      
    })
    .then(res => {
      console.log(res.body)
    })

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
          <input className="formfield" id="email" type="email" value= {this.state.email} placeholder="Email Address" onChange = {event => this.setState({email: event.target.value})}/><br/><br/>
          <input className="formfield" id="password" type="password" value= {this.state.password} placeholder = "Password" onChange = {event=> this.setState({password: event.target.value})}/><br/><br/>

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

import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import {Form, Row, Col, Button, Container} from 'react-bootstrap'
import logo from './logo.png'
import Navbar from './Navbar'

class Login extends Component {

  constructor(props) {
      super(props);
      this.state = {
        changePassEmail: '',
      }
      this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleSubmit(event){
    event.preventDefault();
    console.log(JSON.stringify(this.state))
 
    fetch('api/form-forgotpassword', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      res.json().then(body => console.log(body)); 
    })

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
          <input 
            className="formfield" 
            name="email" 
            type="email" 
            placeholder="Enter Email Address to send Password"
            required = "required"
            value= {this.state.changePassEmail} 
            onChange = {event => this.setState({changePassEmail: event.target.value})}
            />
            <br/><br/>

          <button className="b1">Send Password</button>
        </form>
        
      </div>  
      
    </div>
    );
  }
}

export default Login;

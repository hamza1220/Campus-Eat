import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// import { Link } from 'react-router-dom';
// import {Form, Row, Col, Button, Container} from 'react-bootstrap'
import logo from './logo.png'
import NavbarWithoutSignUp from './NavbarWithoutSignUp'
import SignUpComplete from './Signup_Complete'

class SignUp extends Component {

  constructor(props) {
      super(props);
      this.state = {
        username: '',
        email: '',
        phonenum: '',
        password: '',
        redirect: false,
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleSubmit(event){
    event.preventDefault();
    // const data = new FormData(event.target)
    // console.log(data)   

    console.log(JSON.stringify(this.state))
 
    fetch('api/form-signup', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      res.json().then(body => {
       console.log(body)
       this.setState({redirect: true})
      }); 
    })
  }

  render() {

     if (this.state.redirect) {
      console.log("Should redirect here.")
      return <Redirect to='/signupcomplete'/>;
     }

    return (

    <div className="App">
      <NavbarWithoutSignUp/>
      <br/> <br/> <br/> <br/>
      <img id="logo" src={logo} width="30%" height="30%" alt = ""/>   
      <br/><br/>
      <h1 className="heading"> SIGN UP </h1>
      <p className="heading"> Signup to Campus Eat and start ordering food </p>
      
      {/*<Link to={'./list'}>*/}
      <div className="infocontainer">  
        <form onSubmit={this.handleSubmit}>
          <input 
            className="formfield" 
            name="username" 
            type="text" 
            placeholder="Enter your name"
            required = "required"
            value= {this.state.username} 
            onChange = {event => this.setState({username: event.target.value})}
            />
            <br/><br/>
          <input 
            className="formfield"
            name="email"
            type="email" 
            placeholder="Enter your email address"
            required = "required"
            value= {this.state.email} 
            onChange = {event => this.setState({email: event.target.value})}
            />
            <br/><br/>
          <input 
            className="formfield" 
            name="phonenumber" 
            type="text" 
            placeholder = "Enter your Phone Number (e.g 03001234567)" maxLength="11"
            required = "required"
            value= {this.state.phonenumber} 
            onChange = {event => this.setState({phonenum: event.target.value})}
            />
            <br/><br/>
          <input 
            className="formfield" 
            name="password" 
            type="password" 
            placeholder = "Enter Password" 
            required = "required"
            value= {this.state.password} 
            onChange = {event => this.setState({password: event.target.value})}
            />
            <br/><br/>

          <button className = "b1">Create Account</button>
        </form>
      </div>
     

    </div>
    );
  }
}

export default SignUp;


{/*<Form id= "SignUpForm" className = "infoform">
          
          <Form.Group controlId="formBasicPassword">
            <Form.Control type="text" placeholder="Enter your Name" />
          </Form.Group>


          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control type="text" placeholder="e.g 03001234567" />
          </Form.Group>
          
          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Text className="text-muted">
              We'll never share your phone number with anyone else.
            </Form.Text>
          <br/>
          <Button variant="danger" type="submit">
            Submit
          </Button>
        </Form>*/}
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import MetaTags from 'react-meta-tags';
import logo from './redlogo.png'
import {Redirect } from 'react-router-dom';
import classnames from 'classnames';

class Login extends Component {

  constructor(props) {
      super(props);
      this.state = {
        changePassEmail: '',
        clicked: false,
      }
      this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleSubmit(event){
    event.preventDefault();
    console.log(JSON.stringify(this.state))
 
    fetch('api/forgot-pw', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      res.json().then(body => console.log(body)); 
    })
    this.setState({clicked:true})
  }

  render() {
    if (this.state.clicked) {
      console.log("Should redirect here.")
      return <Redirect to='/passwordsent'/>;
     }

    return (
      <div className="App">
            <MetaTags>
                <meta charSet="utf-8" name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="theme-color" content="#B02737"/>
            </MetaTags>
      <br/> <br/> <br/> <br/>
      <img id="logo" src={logo} width="30%" height="30%" alt = ""/>       
      <h1 className="heading"> Forgot Password </h1>
      <p1 style={{color: "#708090"}}> Your password will be sent to your email address</p1>
      <br/> <br/> <br/>
      <div className="infocontainer">  
        <form onSubmit={this.handleSubmit}>
          <input 
            className={classnames('form-control form-control-lg')} 
            name="email" 
            type="email" 
            placeholder="Enter accociated Email Address"
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

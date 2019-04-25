import React, { Component } from 'react';
import logo from './redlogo.png'
import { Link } from 'react-router-dom';


class PasswordSent extends Component {

  render() {
    return (
	    <div className="App">
			<br/> <br/> <br/> <br/>
	    	<img id="logo" src={logo} width="30%" height="30%" alt = ""/>
	    	<br/> <br/> <br/>
	    	<p1 style={{color: "#708090"}}> Your password has been sent to your email</p1>

      		<br/> <br/> <br/>
      		<div className="infocontainer">  
        		<Link to={'/login'}>
          			<button id="loginbtn" className="b1" >Go To Login</button>
        		</Link>  
      		</div>  
      
    	</div>
    );
  }
}

export default PasswordSent;

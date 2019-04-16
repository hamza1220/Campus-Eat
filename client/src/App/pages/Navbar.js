import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth0Client from '../Auth';
import './Navbar.css'


class Navbar extends Component{
    render() {
        return (
            <div>
              <ul id="nav">
                <li>
                    <Link to={'./signup'}>
                        <button> 
                            Sign Up
                        </button>    
                    </Link>
                	
                </li>
                <li>
                    <Link to={'./login'}>
                        <button> 
                            Login
                        </button>    
                    </Link>
                </li>
              </ul>
            </div>
        );
    }
}


export default Navbar;
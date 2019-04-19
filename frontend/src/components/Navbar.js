import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import './Navbar.css'

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <ul id="nav">
                <a href="" className="nav-link" onClick={this.onLogout.bind(this)}>
                    <img src={user.avatar} alt={user.name} title={user.name}
                        className="rounded-circle"
                        style={{ width: '25px', marginRight: '5px'}} />
                            Logout
                </a>
            </ul>
        )
      const guestLinks = (
        <ul id ="nav">
            <li >
                <Link to="/register"><button>Sign Up</button></Link>
            </li>
            <li >
                <Link to="/login"><button>Login</button></Link>
            </li>
        </ul>
      )
        return(
            // <nav className="navbar navbar-expand-lg navbar-light bg-light" id = "nav" background-color="#">
            //     <Link className="navbar-brand" to="/">Redux Node Auth</Link>
                <div>
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            // </nav>
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
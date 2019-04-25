import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
// import Toolbar from './toolbar.js'
// import SideDrawer from './SideDrawer.js'
// import BackDrop from './BackDrop.js'
import './Navbar.css'
// import Search from './Search'
import './NavbarStyle.css'

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const customer1 = (
            <ul id ="nav">
                <li >
                    <button onClick={this.onLogout.bind(this)}>
                        Logout
                    </button>
                </li>
                <li >
                    <Link to="/editprofile"><button>Profile</button></Link>
                </li>
                <li >
                    <Link to="/userscreen"><button>Restaurants</button></Link>
                </li>
                <li >
                    <Link to="/blank"><button>Orders</button></Link>
                </li>
                <li >
                    <input id="searchObject" type="text" placeholder="Search for food"/>
                </li>
            </ul>

        )
        const cashier1 = (
            <ul id ="nav">
                <li >
                    <button onClick={this.onLogout.bind(this)}>
                        Logout
                    </button>
                </li>
                <li >
                    <Link to="/editprofile"><button>Profile</button></Link>
                </li>
                <li >
                    <Link to="/blank"><button>Orders</button></Link>
                </li>
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
                <div>
                    {isAuthenticated ? (user.user_type==="customer"? customer1 : cashier1) : guestLinks}
                </div>
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
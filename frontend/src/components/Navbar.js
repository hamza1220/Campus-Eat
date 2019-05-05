import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import { Button, Modal, Table} from 'react-bootstrap';
import logo from './whiteEdited.png'
// import Toolbar from './toolbar.js'
// import SideDrawer from './SideDrawer.js'
// import BackDrop from './BackDrop.js'
import './Navbar.css'
// import Search from './Search'
// import './Search.css'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            show: false,
            results: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleClose() {
        this.setState({value: '', show: false, currItems:[]});
    }

    handleShow(items) {
        this.setState({show: true, results: items});

    }

    handleSubmit(event) {
        event.preventDefault();
        let convUpperCase= new Promise((resolve,reject)=>{
        	var queryArray= this.state.value.split(" ")
        	var finalString= ""
        	for(var i=0;i<queryArray.length;i++){
        		queryArray[i]= queryArray[i].charAt(0).toUpperCase() + queryArray[i].slice(1);
        		finalString= finalString+queryArray[i]+" "
        	}
        	var newStr = finalString.substring(0, finalString.length-1);
        	resolve(newStr)
        })
        convUpperCase.then(searchString=>{
	        fetch('api/search', {  
	            method: 'post',
	            headers: {'Content-Type': 'application/json'},
	            body: JSON.stringify({ "user": {
	              "search" : searchString}
	            }),
	        })
	        .then(res => {
	          res.json().then(body => {
	            var finalArray= []
	            let p= new Promise((resolve, reject)=>{
	            	for(var i=0;i<body.length;i++){
	            		var element= body[i]
	            		for(var j=0;j<element.length;j++){
	            			finalArray.push(element[j])
	            		}
	            	}
	            	for(var i=0;i<finalArray.length;i++){
	            		var currElement= finalArray[i]
	            		for(var j=i+1;j<finalArray.length;j++){
	            			if(finalArray[j].item_id==currElement.item_id){
	            				finalArray.splice(j, 1)
	            			}
	            		}
	            	}
	            	resolve(finalArray)
	            })
	            p.then(array=>{
		            this.setState({results: array})
		            this.handleShow(array);
	            })
	        }); 
	      })	
        })
    }

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
                    <Link to="/orders"><button>Orders</button></Link>
                </li>
                <li >
                    <form onSubmit={this.handleSubmit} style={{border: "none", height: "100%"}}>
                        <input type="text" placeholder= "Search for food" value={this.state.value} onChange={this.handleChange}/>
                        <button className="searchButton" ></button>
                    </form>
                </li>
                <li style={{float: "left"}}>
                	<a href= "/"><img src={logo}/></a>
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
                    <Link to="/rest_orders"><button>Orders</button></Link>
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

        const resultItems= this.state.results.map((d,i)=>
            <tr>
                <td> {d.restaurant_name} </td>
                <td> {d.name} </td>
                <td> {d.price} </td>
            </tr>
        )
        return(
                <div>
                    {isAuthenticated ? (user.user_type==="customer"? customer1 : cashier1) : guestLinks}
                    <Modal show={this.state.show} onHide={this.handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Results here</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Restaurant</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                                <tbody>
                                {resultItems}

                                <tr> 
                                </tr>
                                </tbody>
                        </Table>
                      </Modal.Body> 

                      <Modal.Footer>
                        <Button variant="danger" onClick={this.handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
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
import React, { Component } from 'react';
import user_background from './userscreen_background.jpeg'
import './userscreen.css'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setRestaurant } from '../actions/restaurant';
import { Link, Redirect } from 'react-router-dom';


class user_orders extends Component {
 	constructor(props){
 		super(props);

 		this.state={
 			orders:''
 		};
 	}
    
	componentDidMount(){
        var email = String(this.props.auth.user.email)
        console.log(email);
		fetch('api/orders', {
          method: 'POST',
          body: JSON.stringify({email: email}),
          headers: {
            "Content-Type": "application/json",
          }
        })
	    .then(res => res.json())
	    .then(body =>{
	    	let t = ((body))
            this.setState({orders: t})
	    })
	}

    render() {
        var ord= []
        for (var i = this.state.orders.length - 1; i >= 0; i--) {
            ord.push(this.state.orders[i])
        }
        console.log(ord)

       const drink_items = ord.map((d,i)=> 
            <div id="lol">
                <div key={i}> 
                    <div>{d.customer_email}  {d.restaurant_name}  {d.del_time} {d.customer_email} </div>
                </div>
            </div>
        )
        return (
            <div>
        		{drink_items}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export  default connect(mapStateToProps, {})(user_orders)
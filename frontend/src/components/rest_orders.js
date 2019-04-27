import React, { Component } from 'react';
import user_background from './userscreen_background.jpeg'
import './userscreen.css'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setRestaurant } from '../actions/restaurant';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';


class rest_orders extends Component {
 	constructor(props){
 		super(props);

 		this.state={
 			orders:''
 		};
 	}
    
  componentDidMount(){
        var restaurant_name = String(this.props.auth.user.user_type).split('_')[1]
        this.lookupInterval = setInterval(() => {
          axios.post('/getrestorders', {
            restaurant_name: restaurant_name,
            })
          .then((response) => {
            // console
              console.log(response.data)
          })
        }, 8500)
        
  }


  render() {
      var pending= []
      for (var i = this.state.orders.length - 1; i >= 0; i--) {
          if (this.state.orders[i].status==="pending"){
              pending.push(this.state.orders[i])
          }
      }

       //  var ord= []
       //  for (var i = this.state.orders.length - 1; i >= 0; i--) {
       //      ord.push(this.state.orders[i])
       //  }
       //  console.log(ord)

       // const drink_items = ord.map((d,i)=> 
       //      <div id="lol">
       //          <div key={i}> 
       //              <div>{d.customer_email}  {d.restaurant_name}  {d.del_time} {d.customer_email} </div>
       //          </div>
       //      </div>
       //  )
        return (
            <div>
        		asdadsf
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export  default connect(mapStateToProps, {})(rest_orders)
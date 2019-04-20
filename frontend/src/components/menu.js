import React, { Component } from 'react';
import { setRestaurant } from '../actions/restaurant';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import store from '../store'
// import user_background from './userscreen_background.jpeg'
// import './userscreen.css'
// import StarRatingComponent from 'react-star-rating-component'
 

class Menu extends Component {
 	constructor(props){
 		super(props);

 		this.state={
 			rest: '',
 		};
 	}
    
	componentDidMount(){
        // console.log("store",this.props.rest)
        var x = String(this.props.location.state.id)
        this.setState({rest: x})
        fetch('api/menu', {
	      method: 'POST',
	      body: JSON.stringify(this.state),
	      headers: {
	        "Content-Type": "application/json",
	      }
	    })
	    .then(res => {
	      	res.json().then(body => {
	       	console.log(body)
	       	})
	    }); 
	    }

    render() {
        return (
            <div>
        		{this.state.rest}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    rest: state.rest
})

export default connect(mapStateToProps, {setRestaurant})(Menu);
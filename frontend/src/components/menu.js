import React, { Component } from 'react';
// import { setRestaurant } from '../actions/restaurant';
import { connect } from 'react-redux';

class Menu extends Component {
 	constructor(props){
 		super(props);
 		this.state={
 			rest: '',
 		};
 	}
    
	componentDidMount(){
        var x = String(this.props.location.state.id)
        this.setState({rest: String(this.props.location.state.id)})
        fetch('api/menu', {
	      method: 'POST',
	      body: JSON.stringify({rest: x}),
	      headers: {
	        "Content-Type": "application/json",
	      }
	    })
	    .then(res => {
	      	res.json().then(body => {
	       	console.log(body)
	       	console.log("you are",this.props.auth.user) //ALL USER INFORMATION CAN BE ACCESSED THIS WAY
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
    auth: state.auth,
})

export default connect(mapStateToProps,  {})(Menu)
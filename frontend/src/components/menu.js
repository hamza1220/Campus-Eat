import React, { Component } from 'react';
// import { setRestaurant } from '../actions/restaurant';
import { connect } from 'react-redux';
import './menu.css'
import { Link} from 'react-router-dom';


class Menu extends Component {
 	constructor(props){
 		super(props);
 		this.state={
 			rest: '',
 			menu: [],
 			cart: [],
 		};
 	}
    
	componentDidMount(){
        var y = String(this.props.location.state.id)
        this.setState({rest: String(this.props.location.state.id)})
        fetch('api/menu', {
	      method: 'POST',
	      body: JSON.stringify({rest: y}),
	      headers: {
	        "Content-Type": "application/json",
	      }
	    })
	    .then(res => {
	      	res.json().then(body => {
    //   		for (var i = body.length - 1; i >= 0; i--) {
		  //      	this.state.menu.push([body[i].id, body[i].name, body[i].price, body[i].category])
				// // console.log(body[i].id, body[i].name, body[i].price, body[i].category)      			
    //   		}
	   //     	})
	   		let t = ((body))
	       	// console.log(res)
	       	// let x = this.state.menu
	       	// console.log("men", t)

	       	this.setState({menu: t})
	       	// console.log("menu", this.state.menu)
	    }); 
	    })}

	addToCart(e,id,name,price)
	{	e.preventDefault()
		this.state.cart.push({item_id: id, name: name, price: price})
		console.log(this.state.cart)
	}

    render() {
    	const items = this.state.menu.map((d,i)=> 
    		<div>
    		<div id= "items" key={i}> 
	    		Name: {d.name} Price: Rs.{d.price}
	 			<button id="b1" onClick = {(e)=> {this.addToCart(e,d.item_id,d.name,d.price)}}> Add to Cart </button>  
    			<br/>
				<br/>
    		</div>
    		<br/>
    		<br/>
    		</div>
    	)

        return (

            <div>
            <br/><br/><br/>
				{items}
            	<Link to={{ pathname: '/cart', state: { id: '123' }}}>
            		<button id="cartbtn"> View Shopping Cart </button>
            	</Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps,  {})(Menu)
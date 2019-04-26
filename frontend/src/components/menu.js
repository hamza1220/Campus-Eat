import React, { Component } from 'react';
// import { setRestaurant } from '../actions/restaurant';
import { connect } from 'react-redux';
import './menu.css'
// import { Link} from 'react-router-dom';


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
		   		let t = ((body))
		       	this.setState({menu: t})
		    }); 
	    })
	}

	addToCart(e,id,name,price)
	{	e.preventDefault()
		this.state.cart.push({item_id: id, name: name, price: price})
	}

	viewCart(e, cart)
	{
		e.preventDefault()
		console.log("Your Shopping Cart", cart)
	}

    render() {
    	var food= []
    	for (var i = this.state.menu.length - 1; i >= 0; i--) {
    		if (this.state.menu[i].category==="Food"){
    			food.push(this.state.menu[i])
    		}
    		else{
    			console.log(this.state.menu[i])
    		}
    	}

    	var drinks = []
    	for (var j = this.state.menu.length - 1; j >= 0; j--) {
    		if (this.state.menu[j].category==="Drinks"){
    			drinks.push(this.state.menu[j])
    		}
    	}

    	const food_items = food.map((d,i)=> 
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

    	const drink_items = drinks.map((d,i)=> 
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
	            CATEGORY: Food
				{food_items}
				CATEGORY: Drinks
				{drink_items}
        		<button id="cartbtn" onClick = {(e)=> {this.viewCart(e,this.state.cart)}}> View Shopping Cart </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps,  {})(Menu)
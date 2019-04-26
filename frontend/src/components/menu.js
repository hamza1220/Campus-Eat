import { Button, Modal, InputGroup, FormControl, Form} from 'react-bootstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './menu.css'
// import { Link} from 'react-router-dom';


class Menu extends Component {
 	constructor(props){
 		super(props);
 		this.handleShow = this.handleShow.bind(this);
    	this.handleClose = this.handleClose.bind(this);

 		this.state={
 			rest: '',
 			menu: [],
 			show: false,
 			cart: [],
 			location:'',
 			instructions: ''
 		};
 	}
 	handleClose() {
	    this.setState({ show: false });
	}

	handleShow() {
	   this.setState({ show: true });

	}
	placeOrder(event,email){
		event.preventDefault();
		let loc =event.target.location.value
		let inst =event.target.instruction.value

		this.setState({location:loc})
		this.setState({instructions:inst})

		console.log(inst)
		let o = {orderID:12, customer_email:email, restaurant_name: this.state.rest,
			items:this.state.cart, del_location: loc, status: "pending", 
			instructions: inst}
		console.log(o)
	}

	submit(event){
    event.preventDefault();
    console.log('Search');
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

	addToCart(e,id,name,price, cat)
	{	e.preventDefault()
		this.state.cart.push({item_id: id, name: name, price: price, category: cat, 
			restaurant_name: this.state.rest})
	}

    render() {
    	var food= []
    	for (var i = this.state.menu.length - 1; i >= 0; i--) {
    		if (this.state.menu[i].category==="Food"){
    			food.push(this.state.menu[i])
    		}
    	}

    	var drinks = []
    	for (var j = this.state.menu.length - 1; j >= 0; j--) {
    		if (this.state.menu[j].category==="Drinks"){
    			drinks.push(this.state.menu[j])
    		}
    	}

    	let c = this.state.cart
    	let total_price = 0;
    	for (var i = c.length - 1; i >= 0; i--) {
    		total_price = total_price + c[i].price
    	}

    	const cart_items = c.map((d,i)=> 
    		<div>
    		{d.name} {d.price}
    		</div>
    		)

    	const food_items = food.map((d,i)=> 
    		<div id="lol">
	    		<div id= "items" key={i}> 
	    		    <div>&nbsp; {d.name} </div>
	    			<div className="spacer"/>
		    		<div> Rs.{d.price} &nbsp; </div>
	    		</div>
		 	<button id='b2' onClick = {(e)=> {this.addToCart(e,d.item_id,d.name,d.price, d.category)}}> &nbsp; + &nbsp; &nbsp; </button>  
    		</div>
    	)

    	const drink_items = drinks.map((d,i)=> 
    		<div id="lol">
	    		<div id= "items" key={i}> 
	    		    <div>&nbsp; {d.name} </div>
	    			<div className="spacer"/>
		    		<div> Rs.{d.price} &nbsp; </div>
	    		</div>
		 	<button id='b2' onClick = {(e)=> {this.addToCart(e,d.item_id,d.name,d.price, d.category)}}> &nbsp; + &nbsp; &nbsp; </button>  
    		</div>
    	)
        return (
            <div id="bg">
            <h1 id="heading">{this.state.rest}
            	<Button variant="danger" className = "VC" onClick={this.handleShow}>
		        </Button>
		    </h1>
		    <small className="heading"> Select an Item to add to your Shopping Cart </small>

            <br/><br/>
	            <h4 className = "heading">Food</h4>
				{food_items}
				<br/>
				<h4 className="heading">Drinks</h4>
				{drink_items}
				<br/>

		        <Modal show={this.state.show} animation='true' onHide={this.handleClose}>
		          <Modal.Header closeButton>
		            <Modal.Title>Shopping cart for {this.state.rest}</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>

		          {cart_items}
		          Total Order price: {total_price}
		         <form onSubmit={(e)=>{this.placeOrder(e,this.props.auth.user.email)}}>
                        <input
                        type="text"
                        placeholder="Location to deliver to"
                        name="location"
                        /><input
                        type="text"
                        placeholder="Instructions"
                        name="instruction"
                        />
				  <button variant="primary" type="submit">
				    Submit
				  </button>
				</form>

		          </Modal.Body>
		          <Modal.Footer>

		          </Modal.Footer>
		        </Modal>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps,  {})(Menu)
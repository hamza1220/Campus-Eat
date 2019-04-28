import { Button, Modal, Table} from 'react-bootstrap';
import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import { connect } from 'react-redux';
import './menu.css'

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
 			instructions: '',
 			total: 0,
 			showmessage: false,
 			message: '',
 			emptycart: false,
 		};
 	}
 	handleClose() {
	    this.setState({ show: false , showmessage:false});
	}

	handleShow() {
	   this.setState({ show: true });

	}
	placeOrder(event,email, number){
		event.preventDefault();
		
		
		let loc =event.target.location.value
		
		let inst = (event.target.instruction.value!==''? event.target.instruction.value:  'None')

		this.setState({location:loc})
		this.setState({instructions:inst})

		if (this.state.cart.length === 0){
			this.setState({emptycart:true})

		}
		else{

			let o = {orderID: Math.floor(Math.random() * 1000000000000), customer_email:email, 
				customer_number:number, restaurant_name: this.state.rest,
				items:this.state.cart, del_location: loc, status: "pending", 
				instructions: inst}
			// console.log(o)
			// this.setState({show:false});
			fetch('/placeorder', {
		      method: 'POST',
		      body: JSON.stringify(o),
		      headers: {
		        "Content-Type": "application/json",
		      }
		    })
		    .then(res => {
		      	res.json().then(body => {
			   		let response = (body)
			       	console.log(response)
			       	this.setState({showmessage:true, message: response, cart: [], location: '', instructions: '', total:0})
			    }); 
		    })

		}

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
		let updatedPrice= this.state.total + price
		this.setState({total: updatedPrice})
	}

	removeItemFromCart(e,item_id)
	{
		let remPrice = 0
		for (var z = this.state.cart.length - 1; z >= 0; z--) {
			if (this.state.cart[z].item_id===item_id)
			{
				remPrice=this.state.cart[z].price
				break
			}

		}
		let new_price = this.state.total- remPrice
		this.state.cart.splice(z,1)
		this.setState({total: new_price})
		console.log(this.state.cart)
	}

    render() {

    	if (this.state.emptycart === true){
    		alert("Your shopping cart is empty. Please click the + symbol next to an item to add it to your cart.")
    		this.state.emptycart = false
    	}

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

    	const food_items = food.map((d,i)=> 
    		<div id="lol">
	    		<div id= "items" key={i}> 
	    		    <div>&nbsp; {d.name} </div>
	    			<div className="spacer"/>
		    		<div> Rs.{d.price} &nbsp; </div>
	    		</div>
		 	<button id='b2' title="Add to cart" onClick = {(e)=> {this.addToCart(e,d.item_id,d.name,d.price, d.category)}}> &nbsp; + &nbsp; &nbsp; </button>  
    		</div>
    	)

    	const drink_items = drinks.map((d,i)=> 
    		<div id="lol">
	    		<div id= "items" key={i}> 
	    		    <div>&nbsp; {d.name} </div>
	    			<div className="spacer"/>
		    		<div> Rs.{d.price} &nbsp; </div>
	    		</div>
		 	<button id='b2' title="Add to cart" onClick = {(e)=> {this.addToCart(e,d.item_id,d.name,d.price, d.category)}}> &nbsp; + &nbsp; &nbsp; </button>  
    		</div>
    	)
    	
    	const cart_table = c.map((d,i)=>
    		<tr>
	    		<td> {d.item_id} </td>
	    		<td> {d.name} </td>
	    		<td> {d.price} </td>
	    		<td> <Button variant = "danger" onClick = {(e)=>{this.removeItemFromCart(e,d.item_id)}}> Remove </Button> </td>
	    	</tr>
    	)

    	const view_cart = (
    	<Modal show={this.state.show} animation='true' onHide={this.handleClose}>	
    		<Modal.Header closeButton>
	            <Modal.Title>Shopping cart for {this.state.rest}</Modal.Title>
	          </Modal.Header>
	          <Modal.Body>

		          <Table>
		          	<thead>
		          		<tr>
			          		<th>Item ID</th>
			          		<th>Name</th>
			          		<th>Price</th>
		          		</tr>
		          	</thead>
		          		<tbody>
			          		{cart_table}
			          	<tr> 
			          		<td> </td>
			          		<td> <b>Total Order Price</b> </td>
			          		<td> <b>{this.state.total}</b> </td>
			          	</tr>
						</tbody>
		          </Table>

		         <form onSubmit={(e)=>{this.placeOrder(e,this.props.auth.user.email,this.props.auth.user.number)}}>
	                <label>
	                    Delivery Location &nbsp; &nbsp; &nbsp;  
	                    <input
	                    type="text"
	                    placeholder="Location to deliver to"
	                    name="location"
	                    required
	                    />
	                </label>
	                <br/>

	                <label>
	                	Special Instructions &nbsp;
	                    <input
	                    type="text"
	                    placeholder="Instructions"
	                    name="instruction"
	                    // value = {this.state.instructions}
	                    />
	                </label>
	                <br/>
					<Button variant="danger" type="submit">
					  Place Order
					</Button>
				</form>

	          </Modal.Body>
	          <Modal.Footer>

	          </Modal.Footer>
	    </Modal>
    		)

    	const view_message = (
    		<Modal show={this.state.show} animation='true' onHide={this.handleClose}>	
    		<Modal.Header closeButton>
	            <Modal.Title>Shopping cart for {this.state.rest}</Modal.Title>
	          </Modal.Header>
	          <Modal.Body>

		         	<p>{this.state.message} </p>

	          </Modal.Body>
	          <Modal.Footer>

	          </Modal.Footer>
	    </Modal>
	    ) 

	    
        return (
            <div id="bg">
				<MetaTags>
	                <meta charSet="utf-8" name="viewport" content="width=device-width, initial-scale=1.0"/>
	                <meta name="theme-color" content="#B02737"/>
	            </MetaTags>
            <h1 id="heading">{this.state.rest}
            	<Button variant="danger" title="View shopping cart" className = "VC" onClick={this.handleShow}>
		        </Button>
		    </h1>
		    <h5 className="heading1"> Select an Item to add to your Shopping Cart </h5>

            <br/>
	            <h4 className = "heading">Food</h4>
				{food_items}
				<br/>
				<h4 className="heading">Drinks</h4>
				{drink_items}
				<br/>
		        	{this.state.showmessage? view_message:view_cart}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps,  {})(Menu)
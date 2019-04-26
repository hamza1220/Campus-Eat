import React, { Component } from 'react';
// import { setRestaurant } from '../actions/restaurant';
import { connect } from 'react-redux';
import './menu.css'
import { Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



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
 		};
 		
 	}
    
  	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
    	this.setState({ show: true });
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
	   		let t =body
	       	this.setState({menu: t})
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

	            <Button variant="primary" onClick={this.handleShow}>
		          Launch demo modal
		        </Button>

		        <Modal show={this.state.show} onHide={this.handleClose}>
		          <Modal.Header closeButton>
		            <Modal.Title>Modal heading</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
		          <Modal.Footer>
		            <Button variant="secondary" onClick={this.handleClose}>
		              Close
		            </Button>
		            <Button variant="primary" onClick={this.handleClose}>
		              Save Changes
		            </Button>
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
import { Button, Modal, Dropdown, DropdownButton } from 'react-bootstrap';
import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import { connect } from 'react-redux';
import './editMenu.css'
import 'font-awesome/css/font-awesome.min.css';
import '../App.css'
// import NotificationBadge from 'react-notification-badge';
// import {Effect} from 'react-notification-badge';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css




		 		// onClick = {(e)=> {this.removeItem(e,d.item_id)}}> &nbsp; Remove &nbsp; &nbsp; 


let status = false
class editMenu extends Component {
 	constructor(props){
 		super(props);
 		this.handleShow = this.handleShow.bind(this);
    	this.handleClose = this.handleClose.bind(this);

 		this.state={

 			rest: '',
 			menu: [],
 			show: false,
 			message: '',
 			showmessage: false,
 			clicked:false,
 			category: 'Select Category',
 			
 			edit: false,
 			editmessage:false,
 			edititem: [],
 			ename:'',
 			// oldname:'',
 			eprice:0,
 			ecat: '',
 			eid: 0,
 			emessage: '',
 		};
        this.handleClose1 = this.handleClose1.bind(this);
        this.handleInputChangeName = this.handleInputChangeName.bind(this)
        this.handleInputChangePrice = this.handleInputChangePrice.bind(this)

 	}
 	handleClose() {
	    this.setState({ show: false , showmessage:false, category: 'Select Category'});
	}

	handleShow() {
	   this.setState({ show: true, category: 'Select Category' });

	}

	handleClose1() {
	    this.setState({ edit: false , editmessage:false, category: 'Select Category', ename:'', eprice: 0, ecat: '',eid:0 });
	}

	handleShow1(e, item_id, name, price, category) {
	    // let set1 = {item_id: item_id, name: name, price: price, category: category, restaurant_name: this.state.rest}
	    // this.state.edititem.push(set1)
	    this.setState({edit:true, category: category, ename: name, eprice: price, ecat: category, eid: item_id});

	}


	addItem(event){
		event.preventDefault();

		if (event.target.price.value <= 0) {
			toast.error("Price of an item cannot be 0 or less than 0. " , {
	        position: toast.POSITION.TOP_CENTER,
	        autoClose: 8000
	    })}

		else {
			this.setState({clicked: true})
			console.log(event.target.name.value , event.target.price.value, this.state.category)		
			let n = event.target.name.value.charAt(0).toUpperCase() + event.target.name.value.slice(1)
			let p = event.target.price.value

			if (this.state.category!=='Select Category'){
			fetch('api/additem', {
		      method: 'POST',
		      body: JSON.stringify({rest: String(this.props.auth.user.user_type).split('_')[1], 
		      	name: event.target.name.value, 
		      	price: event.target.price.value, 
		      	category: this.state.category}),
		      headers: {
		        "Content-Type": "application/json",
		      }
		    }).then(res=>{

				// console.log("check1",event.target.name.value , event.target.price.value, this.state.category)		
		    	let name = n.split(" ")
		    	let newname = name[0].charAt(0).toUpperCase() + name[0].slice(1)

				for (var i = 1; i < name.length ; i++) {
					newname = newname + " " + name[i].charAt(0).toUpperCase() + name[i].slice(1)
				}

		    	let x = this.state.category
		    	let y = this.state.rest
			    this.state.menu.push({item_id: res, name: newname, price: p, category: x, restaurant_name: y})
		       	this.setState({showmessage:true, message: "Item Added To Menu", category: 'Select Category', clicked: false})
		    })
		    	
	       }
		}



	}

	editItem(e){
		e.preventDefault()
		console.log(this.state.ename, this.state.eprice, this.state.category, this.state.eid)

		if (this.state.eprice <= 0) {
			toast.error("Price of an item cannot be 0 or less than 0. " , {
	        position: toast.POSITION.TOP_CENTER,
	        autoClose: 8000
	    })}

		else {

		
			fetch('api/edititem', {
		      method: 'POST',
		      body: JSON.stringify({rest: String(this.props.auth.user.user_type).split('_')[1], 
		      	name: this.state.ename, 
		      	price: this.state.eprice, 
		      	item_id: this.state.eid, 
		      	category: this.state.category
		      }),

		      headers: {
		        "Content-Type": "application/json",
		      }
		    }).then(res => { 
		    	// console.log(this.state.oldname, this.state.ename)   	
		    	let filtered = this.state.menu
		    	let name = this.state.ename.split(" ")
		    	let newname = name[0].charAt(0).toUpperCase() + name[0].slice(1)
		    	for(var j=1; j<name.length; j++){
		    		newname = newname + " " + name[j].charAt(0).toUpperCase() + name[j].slice(1)
		    	}

			    for (var i = filtered.length - 1; i >= 0; i--) {
			    	if (filtered[i]["item_id"] ===this.state.eid){
			    		filtered[i]["name"]=newname
			    		filtered[i]["price"]=parseInt(this.state.eprice,10)
			    		filtered[i]["category"]=this.state.category
			    		break
			    	}
			    }
			    this.setState({menu: filtered})
		       	this.setState({edit: false, editmessage:true, emessage: "Item has been Edited." ,category: 'Select Category'})
		    })

		   	toast.error("Item edited successfully. " , {
		        position: toast.POSITION.TOP_CENTER,
		    });

		}
	}   


	componentDidMount(){
        var y = String(this.props.auth.user.user_type).split('_')[1]
        this.setState({rest: y})
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
		if(this.props.auth.isAuthenticated){
	    	if (this.props.auth.user.user_type!=="customer"){
		    	status=true
	    	}
	    }

	}

	handleInputChangeName(e) {
        this.setState({
            ename: e.target.value
        })
    }

	handleInputChangePrice(e) {
        this.setState({
            eprice: e.target.value
        })
    }

    handleRemove(e, itemID, name, rest) {
    	console.log(name, rest)
	    confirmAlert({
	      title: 'Delete ' + name,
	      message: 'Are you sure you want to delete '+ name + ' from menu?',
	      buttons: [
	        {
	          label: 'Yes',
	          // onClick: () => alert('Click Yes'),
	          onClick: ()=> {this.removeItem(e, itemID, name, rest)}
	        },
	        {
	          label: 'No',
	        }
	      ]
	    });

    }

	removeItem(e, item_id, name, rest){
		e.preventDefault();
		let p1 = new Promise((resolve, reject)=>{
			let filtered = this.state.menu.filter(item => item["item_id"]!== item_id)
	            resolve(filtered)
        })
        p1.then(filtered => {
			// console.log(filtered)
			this.setState({menu: filtered})
		})

		fetch('api/delete_item', {
	      method: 'POST',
	      body: JSON.stringify({
	      	item_id: item_id,
	      	name: name,
	      	rest: rest}),
	      headers: {
	        "Content-Type": "application/json",
	      }
	    })

	   	toast.error(name + " deleted successfully. " , {
	        position: toast.POSITION.TOP_CENTER,
	    });



	}

	selectCat(e, cat){
		e.preventDefault()
		this.setState({category: cat})
	}


    render() {

	    toast.configure({
  			autoClose: 6000,
		 	draggable: false,
		});


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

    	var promo = []
    	for (var j = this.state.menu.length - 1; j >= 0; j--) {
    		if (this.state.menu[j].category==="Promotions"){
    			promo.push(this.state.menu[j])
    		}
    	}

    	let c = this.state.cart

    	const food_items = food.map((d,i)=> 
    		<div id="lol" key={i}>
	    		<div id= "items" > 
	    		    <div>&nbsp; {d.name} </div>
	    			<div className="spacer"/>
		    		<div> Rs.{d.price} &nbsp; </div>
	    		</div>
		 	<Button variant="info" className="itemButton" title="Edit this item" onClick = {(e)=>{this.handleShow1(e,d.item_id, d.name, d.price, d.category)}}> &nbsp; Edit &nbsp; &nbsp; </Button>  
		 	<Button variant="danger" className="itemButton" title="Remove this item from inventory" 
		 		onClick = {(e)=> {this.handleRemove(e,d.item_id, d.name, this.state.rest)}}> &nbsp; Remove &nbsp; &nbsp; 
		 	</Button>

    		</div>
    	)

    	const drink_items = drinks.map((d,i)=> 
    		<div id="lol" key={i}>
	    		<div id= "items" > 
	    		    <div>&nbsp; {d.name} </div>
	    			<div className="spacer"/>
		    		<div> Rs.{d.price} &nbsp; </div>
	    		</div>
		 	<Button variant="info" className="itemButton" title="Edit this item" onClick = {(e)=>{this.handleShow1(e,d.item_id, d.name, d.price, d.category)}}> &nbsp; Edit &nbsp; &nbsp; </Button>  
		 	<Button variant="danger" className="itemButton" title="Remove this item from inventory"
		 		onClick = {(e)=> {this.handleRemove(e,d.item_id, d.name, this.state.rest)}}> &nbsp; Remove &nbsp; &nbsp; 
		 	 </Button>  

    		</div>
    	)

    	const promo_items = promo.map((d,i)=> 
    		<div id="lol" key={i}>
	    		<div id= "items" > 
	    		    <div>&nbsp; {d.name} </div>
	    			<div className="spacer"/>
		    		<div> Rs.{d.price} &nbsp; </div>
	    		</div>
		 	<Button variant="info" className="itemButton" title="Edit this item" onClick = {(e)=>{this.handleShow1(e,d.item_id, d.name, d.price, d.category)}}> &nbsp; Edit &nbsp; &nbsp; </Button>  
		 	<Button variant="danger" className="itemButton" title="Remove this item from inventory"
		 		onClick = {(e)=> {this.handleRemove(e,d.item_id, d.name, this.state.rest)}}> &nbsp; Remove &nbsp; &nbsp; 
		 	 </Button>  

    		</div>
    	)
    	
    	const edit_cart = (
    	<Modal show={this.state.edit} animation='true' onHide={this.handleClose1}>	
    		<Modal.Header closeButton>
	            <Modal.Title>Edit Item</Modal.Title>
	          </Modal.Header>
	          <Modal.Body>
          		<form onSubmit={(e)=>{this.editItem(e)}}>
	                <label>
	                    Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;   
	                    <input
	                    type="text"
	                    placeholder="Enter Item Name"
	                    name="name"
	                    value= {this.state.ename}
	                    onChange={ this.handleInputChangeName }
	                    required
	                    />
	                </label>
	                <br/>

	                <label>
	                	Price &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; 
	                    <input
	                    type="number"
	                    placeholder="Enter Price in Rs."
	                    name="price"
	                    value= {this.state.eprice}
	                    onChange={ this.handleInputChangePrice }
	                    required
	                    />
	                </label>
	                <br/>

	                <div id= "DD">
		                Category &nbsp;&nbsp;&nbsp;&nbsp; 
		                <DropdownButton id="dropdown-basic-button" variant="info" title={this.state.category} name= "category" required>
						  <Dropdown.Item onClick={(e)=>{this.selectCat(e,"Food")}}> Food </Dropdown.Item>
						  <Dropdown.Item onClick={(e)=>{this.selectCat(e,"Drinks")}}> Drinks</Dropdown.Item>
						  <Dropdown.Item onClick={(e)=>{this.selectCat(e,"Promotions")}}> Promotions</Dropdown.Item>
						</DropdownButton>
					</div>	
					<br/>
	               

					<Button variant="danger" type="submit">
					  Save Changes
					</Button>
				</form>
		        
	          </Modal.Body>
	          <Modal.Footer>

	          </Modal.Footer>
	    </Modal>
    		)



    	const view_cart = (
    	<Modal show={this.state.show} animation='true' onHide={this.handleClose}>	
    		<Modal.Header closeButton>
	            <Modal.Title>Add New Item To Menu</Modal.Title>
	          </Modal.Header>
	          <Modal.Body>

		         <form onSubmit={(e)=>{this.addItem(e)}}>
	                <label>
	                    Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;   
	                    <input
	                    type="text"
	                    placeholder="Enter Item Name"
	                    name="name"
	                    required
	                    />
	                </label>
	                <br/>

	                <label>
	                	Price &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; 
	                    <input
	                    type="number"
	                    placeholder="Enter Price in Rs."
	                    name="price"
	                    required
	                    />
	                </label>
	                <br/>

	                <div id= "DD">
		                Category &nbsp;&nbsp;&nbsp;&nbsp; 
		                <DropdownButton id="dropdown-basic-button" variant="info" title={this.state.category} name= "category" required>
						  <Dropdown.Item onClick={(e)=>{this.selectCat(e,"Food")}}> Food </Dropdown.Item>
						  <Dropdown.Item onClick={(e)=>{this.selectCat(e,"Drinks")}}> Drinks</Dropdown.Item>
						  <Dropdown.Item onClick={(e)=>{this.selectCat(e,"Promotions")}}> Promotions</Dropdown.Item>
						</DropdownButton>
					</div>
					{this.state.clicked && this.state.category === 'Select Category'? (<div className="text-danger"><small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please select a category</small></div>):null } 
						
					<br/>

					<Button variant="danger" type="submit">
					  Add Item
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
	            <Modal.Title>In Menu for {this.state.rest}</Modal.Title>
	          </Modal.Header>
	          <Modal.Body>

		         	<p>{this.state.message} </p>

	          </Modal.Body>
	          <Modal.Footer>

	          </Modal.Footer>
	    </Modal>
	    ) 


	    
        return (
        	<div>
        	{!status? <h1 className="heading">Please Login as a Restaurant Manager to Edit Menu</h1>
        		:
            <div id="bg">
				<MetaTags>
	                <meta charSet="utf-8" name="viewport" content="width=device-width, initial-scale=1.0"/>
	                <meta name="theme-color" content="#B02737"/>
	            </MetaTags>
            <h1 id="heading">{this.state.rest}
            	<Button variant="danger" id="cartstyle" onClick={this.handleShow}>
            		<span id="spann" className="fa fa-3x fa-plus"></span> 
            		<h6 id="cartHeading">Add Item</h6>
				</Button>
		    </h1>
		    <h5 className="heading1"> Use the edit and remove buttons to change menu. Press "Add Item" to add new item. </h5>

            <br/>
	            <h4 className = "heading">Food</h4>
				{food_items}
				<br/>
				<h4 className="heading">Drinks</h4>
				{drink_items}
				<br/>
				<h4 className = "heading">Promotions</h4>
				{promo_items}
				<br/>
		        	{this.state.showmessage? view_message:view_cart}
		        	{this.state.edit? edit_cart:null}
            </div>
        	}
        	</div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps,  {})(editMenu)
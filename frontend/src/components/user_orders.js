import React, { Component } from 'react';
// import './userscreen.css'
// import PropTypes from 'prop-types';
import MetaTags from 'react-meta-tags';
import { connect } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component'

// import { setRestaurant } from '../actions/restaurant';
// import { Link, Redirect } from 'react-router-dom';
import './user_orders.css'
import { Button, Modal, Table} from 'react-bootstrap';

let close = false
let received=false

function interval(func, wait, times){
    var interv = function(w, t){
        return function(){
            if(close===true)
            {
                t=0
            }
            if(typeof t === "undefined" || t-- > 0 ){
                setTimeout(interv, w);
                try{
                    func.call(null);
                }
                catch(e){
                    t = 0;
                    throw e.toString();
                }
            }
        };
    }(wait, times);

    setTimeout(interv, wait);
};


class user_orders extends Component {
     constructor(props){
         super(props);

         this.state={
            orders:'',
            show:false,
            currItems: [],
            total:0,
            orderID: null,
            ratings: [],
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.RateRest = this.RateRest.bind(this)
        this.onStarClick = this.onStarClick.bind(this)
    }
    componentDidMount(){
        close=false
        var email = String(this.props.auth.user.email)

        // Load orders instantly on first mount.
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
            received =true
        })
        /////////////////////////////////////////

        interval(() => {
        	// console.log("Loop")
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
	            received =true
	        })
	        }, 2500, 240)
        setTimeout(()=>{window.location.reload()}, 602500)

    }

    componentWillUnmount() {
        close=true
        received=false
    }

    handleClose() {
        this.setState({ show: false, currItems:[], total: 0, orderID:null});
    }

    handleShow(items,id) {
        let total = 0
        for (var i = items.length - 1; i >= 0; i--) {
            total += items[i].price
        }
        this.setState({ show: true, currItems:items, orderID:id, total:total});

    }

    onStarClick(nextValue, prevValue, name) {
        let filtered = this.state.ratings.filter(item => item["id"]!== name)
        // console.log(filtered)
        filtered.push({id: name, rating: nextValue});
        this.setState({ratings: filtered})
        // console.log(this.state.ratings)
    }

    RateRest(restaurant_name, orderID){
        // console.log(orderID)
        console.log(this.state.ratings)
        if (this.state.ratings.length !== 0){
	        let r = []
	        let p1 = new Promise((resolve, reject)=>{
	            r = this.state.ratings.filter(item => item["id"]=== String(orderID))
	            resolve(r)
	        })
	        p1.then(r1 => {
	            console.log("r1",r1,r1[0].rating)
	            fetch('api/rate', {
	              method: 'POST',
	              body: JSON.stringify({orderID: orderID, rest: restaurant_name, rating: r1[0].rating}),
	              headers: {
	                "Content-Type": "application/json",
	              }
	            })	            
	        })    
        }

        // .then(res => res.json())
        // .then(body =>{
        //     console.log(body)
        // })
    }

    render() {
        
        var pending= []
        let check1 = true        
        for (var a = this.state.orders.length - 1; a >= 0; a--) {
            if (this.state.orders[a].status!=="delivered"){
                pending.push(this.state.orders[a])
            }
        }
        if (pending.length === 0){
            check1 = false
        }

        var doneOrders= []
        let check2 = true
        for (var b = this.state.orders.length - 1; b >= 0; b--) {
            if (this.state.orders[b].status==="delivered"){
                // console.log(this.state.orders[b].rating)
                doneOrders.push(this.state.orders[b])
            }
        }
        if (doneOrders.length === 0){
            check2 = false
        }

        const pendingOrders = pending.map((d,i) => 
            <div id="orderdiv" key={i}>
                <div id = "list" > 
                    <ul id = "uList">
                        <li id = "resName">{d.restaurant_name}&nbsp; Order#: {d.orderID}</li>
                        <li>&nbsp;&nbsp;&nbsp;Order Placed at: &nbsp; {(d.order_time).split('T')[0]} &nbsp;&nbsp; {(parseInt(d.order_time.split('T')[1].split('.')[0], 10)+5)%24 }:{(d.order_time.split('T')[1]).split(':')[1]}:{(d.order_time.split('T')[1]).split(':')[2].split('.')[0]} </li>                            
                        <li>&nbsp;&nbsp;&nbsp;Location: &nbsp; {d.del_location}</li>
                        <li>&nbsp;&nbsp;&nbsp;Instructions: &nbsp;{d.instructions}</li>
                        <li>&nbsp;&nbsp;&nbsp;Expected Delivery Time: &nbsp;{d.del_time}</li>
                        <div id="btnn">
                            <Button  variant="danger" title="View Bill" onClick={()=>{this.handleShow(d.items, d.orderID)}}>
                                View Bill
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button  variant={d.status==="pending"? "warning" : "info"  } disabled={true} title="Order Status" onClick={this.handleShow}>
                                Status: {d.status}
                            </Button>
                        </div>
                    </ul>
                </div>
            </div>
        )
        const completedOrders = doneOrders.map((d,i) => 
            <div id="orderdiv" key={i}>
                <div id = "list"> 
                    <ul id = "uList">
                        <li id = "resName"><b>{d.restaurant_name}&nbsp; Order#: {d.orderID} </b></li>
                            <div id= "s1"> 
                                <div id="star"><StarRatingComponent name={String(d.orderID)} editing={d.rating==-1? true:false} starCount={5} value = {d.rating==-1? null:d.rating} onStarClick={this.onStarClick.bind(this)}/> </div> 
                                {d.rating==-1? <div>&nbsp;&nbsp;<Button variant= "info" onClick = {()=>{this.RateRest(d.restaurant_name, d.orderID)}}> Rate Order</Button></div> : null }
                            </div>

                        <li>&nbsp;&nbsp;&nbsp;Order Placed at: &nbsp; {(d.order_time).split('T')[0].split('-')[2]}-{(d.order_time).split('T')[0].split('-')[1]}-{(d.order_time).split('T')[0].split('-')[0]} &nbsp;&nbsp; {(parseInt(d.order_time.split('T')[1].split('.')[0], 10)+5)%24 }:{(d.order_time.split('T')[1]).split(':')[1]}:{(d.order_time.split('T')[1]).split(':')[2].split('.')[0]} </li>                            
                        <li>&nbsp;&nbsp;&nbsp;Location: &nbsp; {d.del_location}</li>
                        <li>&nbsp;&nbsp;&nbsp;Instructions: &nbsp;{d.instructions}</li>
                        <li>&nbsp;&nbsp;&nbsp;Delivered at: &nbsp;{d.del_time}</li>

                        <div id="btnn">
                            <Button variant="danger" title="View Bill" onClick={()=>{this.handleShow(d.items, d.orderID)}}>
                                View Bill
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button variant="success" disabled={true} title="Order Status" onClick={this.handleShow}>
                                Status: {d.status}
                            </Button>
                        </div>
                    </ul>
                </div>
            </div>
        )


        const view_items = this.state.currItems.map((d,i)=>
            <tr>
                <td> {d.item_id} </td>
                <td> {d.name} </td>
                <td> {d.price} </td>
            </tr>
        )

        const none = (
            <div>
                <h6 id="none"> None </h6>
            </div>
        )

        const none2 = (
              <div>
                  <h6 id="none"> You Have No Completed Orders Yet</h6>
              </div>
        )

        const loading = (
              <div>
                  <h6 id="none"> Loading... </h6>
              </div>
        )

        return (
            <div id = "stuff">

                <MetaTags>
                    <meta charSet="utf-8" name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta name="theme-color" content="#B02737"/>
                </MetaTags>

                <div className = "borderx">
                    <h4 className = "heading3">Pending Orders</h4>
                    <br/>
                    {check1 ? pendingOrders: (received ? none: loading)}
                    <br/>
                </div>
                <div className = "borderx">
                    <h4 className = "heading3">Completed Orders</h4>
                    <br/>
                    {check2 ? completedOrders: (received ? none2: loading)}
                    <br/>
                </div>

                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Order Bill for Order# {this.state.orderID}</Modal.Title>
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
                            {view_items}

                            <tr> 
                                <td> </td>
                                <td> <b>Total Order Price</b> </td>
                                <td> <b>{this.state.total}</b> </td>
                            </tr>
                            </tbody>
                    </Table>
                  </Modal.Body> 

                  <Modal.Footer>
                    <Button variant="danger" onClick={this.handleClose}>
                      Close
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

export  default connect(mapStateToProps, {})(user_orders)
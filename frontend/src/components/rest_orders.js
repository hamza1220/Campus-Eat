import React, { Component } from 'react';
// import user_background from './userscreen_background.jpeg';
// import './userscreen.css'
import MetaTags from 'react-meta-tags';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { setRestaurant } from '../actions/restaurant';
// import { Link, Redirect } from 'react-router-dom';
import './rest_orders.css'
import { Button, Modal, Table} from 'react-bootstrap';
import axios from 'axios';

let close=false
let received=false

class rest_orders extends Component {
  constructor(props){
    super(props);

    this.state={
      orders:'',
      show:false,
      currItems: [],
      total:0,
      orderID: null,
      //close:false,
      };

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.interval = this.interval.bind(this);
   }

  interval(func, wait, times){
      var interv = function(w, t){
          return function(){
              // console.log("in")
              if (close===true)
              {
                t=0
              }
              if(typeof t === "undefined" || t-- > 0){
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
  componentWillMount(){
    // this.setState({close: false})
    console.log("new",close)
    close=false
    var restaurant_name = String(this.props.auth.user.user_type).split('_')[1]
    this.interval(() => {
      axios.post('/getrestorders', {
        restaurant_name: restaurant_name,
        })
      .then((response) => {
        // console.log(this.state.close)
        // if(close===false){
          this.setState({orders: response.data})
          // console.log(response.data)
          received=true
        // }

      })
    }, 2500, 240)
    // console.log("received", received)
    setTimeout(()=>{window.location.reload()}, 602500)
        
  }

  componentWillUnmount() {
    close=true
    received=false
    // console.log("in",close)

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

    changeStatus(e,status,id) {
        e.preventDefault()
        if(status==="pending")
        {
          status = "processing"
          fetch('/processing', {
            method: 'POST',
            body: JSON.stringify({orderID: id}),
            headers: {
              "Content-Type": "application/json",
            }
          })

        }
        else if (status==="processing")
        {
          status = "delivered"
          fetch('/delivered', {
            method: 'POST',
            body: JSON.stringify({orderID: id}),
            headers: {
              "Content-Type": "application/json",
            }
          })
        }
  }

    
  render() {
        var pending= []
        let check1=true
        for (var a = this.state.orders.length - 1; a >= 0; a--) {
            if (this.state.orders[a].status!=="delivered"){
                pending.push(this.state.orders[a])
            }
        }
        if (pending.length===0){
          check1=false
        }

        var delivered=[]
        let check2 = true
        for (var b = this.state.orders.length - 1; b >= 0; b--) {
            if (this.state.orders[b].status==="delivered"){
                delivered.push(this.state.orders[b])
            }
        }
        if (delivered.length===0){
          check2 =false
        }  

        const del= "Delivered"
        const acc= "Accept Order"
        const send = "Change Status to Delivered"

        const pendingOrders = pending.map((d,i) => 
          <div id="orderdiv" key={i}>
              <div id = "list"> 
                      <ul id = "uList">
                          <li id = "resName">Order#: {d.orderID}</li>
                          <li>&nbsp;&nbsp;&nbsp;Phone Number: &nbsp; {d.customer_number}</li>
                          <li>&nbsp;&nbsp;&nbsp;Order Placed at: &nbsp; {(d.order_time).split('T')[0].split('-')[2]}-{(d.order_time).split('T')[0].split('-')[1]}-{(d.order_time).split('T')[0].split('-')[0]} &nbsp;&nbsp; {(parseInt(d.order_time.split('T')[1].split('.')[0], 10)+5)%24 }:{(d.order_time.split('T')[1]).split(':')[1]}:{(d.order_time.split('T')[1]).split(':')[2].split('.')[0]} </li>                            
                          <li>&nbsp;&nbsp;&nbsp;Location: &nbsp; {d.del_location}</li>
                          <li>&nbsp;&nbsp;&nbsp;Instructions: &nbsp;{d.instructions}</li>
                          <div id="btnn">
                            <Button variant="danger" title="View Bill" onClick={()=>{this.handleShow(d.items, d.orderID)}}>
                                View Bill
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button variant={d.status==="pending"? "warning" : "info"  } title="Order Status" onClick={(e)=>{this.changeStatus(e,d.status, d.orderID)}}>
                                {d.status==="delivered"? del: (d.status==="pending"? acc: send) }
                            </Button>
                          </div>
                      </ul>
              </div>
          </div>
        )

        const completedOrders = delivered.map((d,i) => 
          <div id="orderdiv" key={i}>
              <div id = "list"> 
                      <ul id = "uList">
                          <li id = "resName">{d.restaurant_name}</li>
                          <li>&nbsp;&nbsp;&nbsp;Order Placed at: &nbsp; {(d.order_time).split('T')[0].split('-')[2]}-{(d.order_time).split('T')[0].split('-')[1]}-{(d.order_time).split('T')[0].split('-')[0]} &nbsp;&nbsp; {(parseInt(d.order_time.split('T')[1].split('.')[0], 10)+5)%24 }:{(d.order_time.split('T')[1]).split(':')[1]}:{(d.order_time.split('T')[1]).split(':')[2].split('.')[0]} </li>                            
                          <li>&nbsp;&nbsp;&nbsp;Location: &nbsp; {d.del_location}</li>
                          <li>&nbsp;&nbsp;&nbsp;Instructions: &nbsp;{d.instructions}</li>
                          <div id="btnn">
                            <Button variant="danger" title="View Bill" onClick={()=>{this.handleShow(d.items, d.orderID)}}>
                                View Bill
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button variant="success" title="Order Status" onClick={(e)=>{this.changeStatus(e,d.status, d.orderID)}}>
                                {d.status==="delivered"? del: (d.status==="pending"? acc: send) }
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
                  <h6 id="none"> You Have No Pending Orders </h6>
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
            <div id= "stuff">

                <MetaTags>
                    <meta charSet="utf-8" name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta name="theme-color" content="#B02737"/>
                </MetaTags>

                <div className = "borderx">
                    <h4 className = "heading3">Pending Orders</h4>
                    <br/>
                    {check1 ? pendingOrders: (received ? none:loading)}
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

export  default connect(mapStateToProps, {})(rest_orders)
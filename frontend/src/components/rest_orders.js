import React, { Component } from 'react';
import user_background from './userscreen_background.jpeg'
// import './userscreen.css'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setRestaurant } from '../actions/restaurant';
import { Link, Redirect } from 'react-router-dom';
import './user_orders.css'
import { Button, Modal, Table} from 'react-bootstrap';

import axios from 'axios';

let close=false

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
    close=false
    console.log("new",close)
    var restaurant_name = String(this.props.auth.user.user_type).split('_')[1]
    this.interval(() => {
      axios.post('/getrestorders', {
        restaurant_name: restaurant_name,
        })
      .then((response) => {
        // console.log(this.state.close)
        // if(close===false){
          this.setState({orders: response.data})
          console.log(response.data)
        // }

      })
    }, 2500, 240)
    setTimeout(()=>{window.location.reload()}, 602500)
        
  }

  componentWillUnmount() {
    close=true
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
      // var pending= []
      // for (var i = this.state.orders.length - 1; i >= 0; i--) {
      //     if (this.state.orders[i].status!=="delivered"){
      //         pending.push(this.state.orders[i])
      //     }
      // }

      // var delivered=[]
      // for (var i = this.state.orders.length - 1; i >= 0; i--) {
      //     if (this.state.orders[i].status==="delivered"){
      //         delivered.push(this.state.orders[i])
      //     }
      // }      

        var ord= []
        for (var i = this.state.orders.length - 1; i >= 0; i--) {
            ord.push(this.state.orders[i])
        }
    
       const orderitems = ord.map((d,i) => 
            <div id="orderdiv">
                <div id = "list" key={i}> 
                    <div>
                        <ul id = "uList">
                            <li id = "resName">{d.restaurant_name}</li>
                            <li>&nbsp;&nbsp;&nbsp;Order Placed at: &nbsp; {(d.order_time).split('T')[0]} &nbsp;&nbsp; {(parseInt(d.order_time.split('T')[1].split('.')[0])+5)%24 }:{(d.order_time.split('T')[1]).split(':')[1]}:{(d.order_time.split('T')[1]).split(':')[2].split('.')[0]} </li>                            
                            <li>&nbsp;&nbsp;&nbsp;Location: &nbsp; {d.del_location}</li>
                            <li>&nbsp;&nbsp;&nbsp;Instructions: &nbsp;{d.instructions}</li>
                            <Button variant="danger" title="View Bill" onClick={()=>{this.handleShow(d.items, d.orderID)}}>
                                View Bill
                            </Button>
                            <Button variant="danger" title="Order Status" onClick={(e)=>{this.changeStatus(e,d.status, d.orderID)}}>
                                {d.status}
                            </Button>


                        </ul>
                    </div>
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
        return (
            <div>
                {orderitems}
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
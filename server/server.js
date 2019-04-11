var express = require("express");
var server = express();
var port = process.env.PORT || 3001;
var path = require('path');

var bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://admin:admin2@ds113640.mlab.com:13640/campus");

var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    assert = require('assert');

// var nameSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String
// });
var itemSchema = new mongoose.Schema({
  itemID: Number,
  name: String,
  price: Number,
  restID: Number,
  description: String,
  category: String,
  rating: Number
})

var orderSchema = new mongoose.Schema({
  orderID: Number,
  custID: Number,
  restaurantID: Number,
  content: String,
  instr:String,
  orderTime: Number ,           //Change this data type afterwards
  orderDate: Number,            //Change this data type afterwards
  cost: Number,
  delTime: Number,
  delLocation: String
  });

var restSchema = new mongoose.Schema({
  restName: String,
  restID:Number,
  restPhone:Number,
  managerID: Number,
  rating: Number,
  menu:[itemSchema]
});


var userSchema = new mongoose.Schema({
  userID: Number,
  name: String,
  email: String,
  password: String,
  phone: Number,
  cart: [String],
  orders: [orderSchema]
});

var cashierSchema = new mongoose.Schema({
  ID: Number,
  name: String,
  email: String,
  password: String,
  restID: Number
  });


// var User = mongoose.model("User", nameSchema);      //var represents the collection name
var newUser = mongoose.model("Users", userSchema);    //Data from signup. Data in inverted commas represent the collection name
var newRest = mongoose.model("Rest", restSchema);    
var newItem = mongoose.model("Items", itemSchema); 
var newCash = mongoose.model("Cashier", cashierSchema); 
var newOrder = mongoose.model("Order", orderSchema); 


server.get('/', function(req, res){
    res.sendFile(path.resolve('index.html'));
});

// server.listen(process.env.PORT, process.env.IP,()=>{
server.listen(port,()=>{
  console.log("Server listening on port " + port);
});


server.post("/adduser", (req, res) => {
  var myData = new newUser(req.body);
  myData.save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

server.post("/addrest", (req, res) => {
  var myData = new newRest(req.body);
  myData.save()
    .then(item => {
      res.send("Saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

server.post("/additem", (req, res) => {
  var myData = new newItem(req.body);
  // console.log(myData);
  myData.save()
    .then(item => {
      console.log("Added an item")
      newRest.updateOne(
          { "restID": item.restID },
          { "$push": { 
               "menu": item
          }}
      )
    .then(doc => res.send(doc), err => res.status(400).send(err))
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

server.post("/addorder", (req, res) => {
  var myData = new newOrder(req.body);
  // console.log(myData);
  myData.save()
    .then(order => {
      console.log(order)
      newUser.updateOne(
          { "userID": order.custID },
          { "$push": { 
               "orders": order
          }}
      )
      // console.log("Updated user order array")
    .then(doc => res.send(doc), err => res.status(400).send(err))
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});
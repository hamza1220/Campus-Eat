const express = require('express');
const path = require('path');
const fs = require('fs')

const app = express();
bodyParser = require('body-parser')
// var path = require('path');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://admin:admin2@ds113640.mlab.com:13640/campus");

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


// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    var list = ["You can sleep now"];
    res.json(list);
    console.log('Sent list of items');
});

app.post('/api/form-login', (req,res)=> {
	console.log("login API call.")
	console.log(req.body)
	// console.log(res)
	// fs.writeFile('hello.JSON',JSON.stringify(req), (err)=> console.log('file wrritten'))
	res.json("Login success");
})

app.post('/api/form-signup', (req,res)=> {
	console.log("signup API call")

	var myData = new newUser(req.body);
  myData.save()
  .then(item => {
    res.json("Signup success");
  })
  .catch(err => {
    res.status(400).send("unable to save to database");
  });
	// console.log(req.body)
	// res.json("Signup success");
})

app.post('/api/form-forgotpassword', (req,res)=> {
	console.log("forgot password API call")
	console.log(req.body)
	res.json("Forgot password success");
})


// Handles any requests that don't match the ones above
app.post('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
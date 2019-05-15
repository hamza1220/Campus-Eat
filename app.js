const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');
const path = require('path');
const crypto = require('crypto');
const nodemailer  = require ('nodemailer');


const User = require('./models/User');
const Item = require('./models/Item');
const Rest = require('./models/Rest');
const Order= require('./models/Order')

const users = require('./routes/user'); 


mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);
// ===================================================================
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
}

app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// app.use(express.static(path.join(__dirname, 'frontend/build')))
// ==================================================================
app.use(bodyParser.urlencoded({ extended: true}));


app.post('/api/rest-ratings', (req,res)=>{
    let z=0
    let c=0
    let j=0
    let f=0
    Rest.find()
    .then(response =>{
        // console.log(response)
        for (i = 0; i < 4; i++) {
          if(response[i].restaurant_name==='Zakir'){
              console.log("sds")
              z=response[i].rating
          }
          if(response[i].restaurant_name ==='Flavors'){
              f=response[i].rating
              console.log("sds")
          }
          if(response[i].restaurant_name==='Jammin'){
              j=response[i].rating
              console.log("sds")
          }
          if(response[i].restaurant_name==='ChopChop'){
              c=response[i].rating
              console.log("sds")
          }
        }
        console.log(z,c,j,f)
        res.send({'Z':z, 'C':c, 'J':j, 'F':f})
    })

})

app.post('/api/giveprofile', (req,res)=>{
	console.log("fetch data of ",req.body)
    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if(user) {
            res.json(user)
        }else{
        	res.json("LLG")
        }
    });
    })

app.post('/api/forgot-pw', (req,res)=>{
	res.json("sent password to your mail")
    const token = crypto.randomBytes(20).toString('hex');
    if (req.body === '') {
      res.status(400).send('email required');
    }
    User.updateOne(
    {
        email: req.body.email
    },
    {$set: 
        {   
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 36000000,       
        }
    })
    .then((user) => {

      if (user === null) {
        console.error('email not in database');
        res.status(403).send('email not in db'); //====================================================
      } 
      else {
        console.log(user);
        var transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
                user: 'campuseat.lums@gmail.com',
                pass: 'group_10'
            }
        });
        console.log(`Sending mail to ${user.email}`)
        const mailOptions = {
          from: 'campuseat.lums@gmail.com',
          to: `${req.body.email}`,
          subject: 'CampusEat Reset Password',
          text:
            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
            + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
            + `https://campuseat.herokuapp.com/reset?id=${token}\n\n`
            + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
        };

        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error('there was an error: ', err);
          } else {
            console.log('here is the res: ', response);
            res.status(200).json('recovery email sent');
          }
        });
      }
    });

})

app.post('/reset', (req, res) => {
    User.findOne({
        resetPasswordToken : req.body.resetPasswordToken,
    })
    .then(items => {
        res.json(items)
    })

  });

app.post('/api/get_rating', (req,res)=>{
    Rest.find({
        restaurant_name: req.body.rest
    })
    .then(R =>{
        console.log(R)
        res.json(R[0].rating)
    })
})

app.post('/api/rate', (req, res)=>{
    // rest = req.body.rest
    // rating = req.body.rating[0]
    // console.log(req.body, req.body.rating, req.body.rating[0])
    Order.updateOne(
        { orderID: req.body.orderID},
        {$set: {
            rating: req.body.rating
        }}
    ).then(console.log("updated"))
    

    Rest.find({
        restaurant_name: req.body.rest
    })
    .then(R => {
        console.log(R)
        let p1 = new Promise((resolve, reject) =>{
            console.log(R[0].rating*R[0].num_orders+req.body.rating)
            let new_rating = ((R[0].rating*R[0].num_orders) + req.body.rating)/(R[0].num_orders+1)
            resolve(new_rating)
        })
        p1.then(new_rating => {
            console.log(R[0].num_orders, new_rating)
            Rest.updateOne(
            {restaurant_name: req.body.rest}, 
            {$set: {
                        rating: new_rating,
                        num_orders: R[0].num_orders+1
            }}).then(console.log("done"))
            
        })

    })
})


app.post('/api/menu', (req,res)=>{
	console.log("send menu of",req.body)
	Item.find({
        restaurant_name : req.body.rest
    })
    .then(items => {res.json(items)})

})

app.post('/api/delete_item' , (req,res)=>{
    // console.log(req.body.item_id)
    Item.deleteOne({
        item_id: parseInt(req.body.item_id,10)
    })
    .then(a => {console.log(a)})

})

app.post('/api/orders', (req,res)=>{
    console.log("sending orders of",req.body)
    Order.find({
        customer_email : req.body.email
    })
    .then(orders => {res.json(orders)})

})

app.post('/api/additem', function(req, res) {
    
    let max = 0
    let p1 = new Promise((resolve, reject) =>{
        let items = Item.find()   
        resolve(items)
        })
        p1.then(items => {
            for (var i = items.length - 1; i >= 0; i--) {
                if(items[i]["item_id"]>max){
                    max=items[i]["item_id"]
                }    
            }

            const newItem = new Item({
                item_id : max+1,
                name : req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1),
                price : req.body.price,
                category : req.body.category,
                restaurant_name : req.body.rest
            });
            newItem.save()
            .then(Item => {
                res.json(max+1)
            })
        })

});

app.post('/api/edititem', function(req, res) {
    console.log("here", req.body.item_id, req.body.name, req.body.price, req.body.category) 

    Item.updateOne(
        {item_id: req.body.item_id}, 
        {$set: {   
                    name: req.body.name,
                    price: parseInt(req.body.price,10),
                    category: req.body.category
                
        }}).then(res1 =>{
            console.log(res1)
            res.json("edited")
        })
})

app.post('/addrest', function(req, res) {
    const newRest= new Rest({
        restaurant_name : req.body.restaurant_name,
        rating : req.body.rating,
        num_orders : req.body.num_orders,
    });
    newRest.save()
    .then(rest=>{
        res.json(rest)
    });
    console.log(req.body)
});

app.post('/placeorder', function(req, res) {
    const newOrder= new Order({
        orderID : req.body.orderID,
        customer_name: req.body.customer_name,
        customer_email : req.body.customer_email,
        customer_number : req.body.customer_number,
        restaurant_name:req.body.restaurant_name,
        items:req.body.items,
        del_location:req.body.del_location,
        del_time: req.body.del_time,
        status:req.body.status,
        instructions:req.body.instructions,
        rating: req.body.rating
    });
    newOrder.save()
    .then(order=>{
        res.json("Your Order has been Placed. Track it in Orders.")
    });
    
    console.log(req.body)
});

app.post('/addorder', function(req,res){
    const newOrder= new Order({
        orderID : req.body.orderID,
        customer_name: req.body.customer_name,
        customer_email : req.body.customer_email,
        restaurant_name : req.body.restaurant_name,
        items : req.body.items,
        order_time : req.body.order_time,
        del_location : req.body.del_location,
        del_time : req.body.del_time,
        status : req.body.status,
        instructions : req.body.instructions
    });
    newOrder.save()
    .then(order=>{
        res.json(order)
    });

    console.log(req.body)
});

app.post('/getrestorders', function(req, res){
    Order.find({
        restaurant_name: req.body.restaurant_name
    })
    .then(orders =>{res.json(orders)})

})

app.post('/delivered', function(req, res){
    console.log("Request to change to delivered")
    Order.updateOne(
        {orderID: parseInt(req.body.orderID)}, 
        {$set: {   
                    status: "delivered",
                    del_time: req.body.del_time
                
        }}).then(()=>{Order.find({
        orderID: parseInt(req.body.orderID)

    })}).then((order)=>{console.log(order)})
})

app.post('/processing', function(req, res){
    console.log("Request to change to processing")   
    Order.updateOne(
        {orderID: parseInt(req.body.orderID)}, 
        {$set: {
                    status: "processing",
                    del_time: req.body.del_time
        }}).then(()=>{Order.find({
        orderID: parseInt(req.body.orderID)
    })}).then((order)=>{console.log(order)})
})

app.post('/api/search', function(req, res) {
    var fullQuery= req.body.user.search
    var searchArray = req.body.user.search.split(" ");
    searchArray.push(fullQuery)
    var returnArray= []
    var count= 0
    for(var i=0;i<searchArray.length;i++){
        count++
        var searchQuery= searchArray[i]
        let p= new Promise((resolve,reject)=>{
            Item.find({
                name: searchQuery
            })
            .then(result=>{
                returnArray.push(result)
                if(returnArray.length==searchArray.length){
                    res.json(returnArray)
                    resolve('done')
                }
            })
        })
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
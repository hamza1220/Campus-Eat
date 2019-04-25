const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');
const path = require('path');

const User = require('./models/User');
const Others = require('./models/Others')

const users = require('./routes/user'); 


mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);

app.use(express.static(path.join(__dirname, 'frontend/build')))
app.use(bodyParser.urlencoded({ extended: true}));


app.get('/api/rest-ratings', (req,res)=>{
	res.send({'Z':'3', 'C':'4', 'J':'3', 'F':'2'})
})

app.post('/api/gibprofile', (req,res)=>{
	console.log("fetch data of ",req.body)
	//GET FROM DB AND RETURN A JSON OBJECT
    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if(user) {
        	// console.log(user)
            res.json(user)
        }else{
        	res.json("Nahi huwa bc")
        }


        });
    })

app.post('/api/forgot-pw', (req,res)=>{
	console.log(req.body)
	//GET FROM DB AND USE NODEMAIL TO SEND PASSWORD TO EMAIL ADDRESS
	res.json("sent password to your mail")
})

app.post('/api/menu', (req,res)=>{
	console.log("send menu of",req.body)
	//GET FROM DB AND RETURN A JSON OBJECT
	res.json("aye yaye")
})
app.post('/additem', function(req, res) {
    const newItem= new Item({
    	item_id : req.body.item_id,
    	name : req.body.name,
    	price : req.body.price,
    	category : req.body.category,
    	restaurant_name : req.body.category 
    });
    newItem.save()
    .then(user=>{
    	res.json(user)
    });
    
    console.log(req)
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
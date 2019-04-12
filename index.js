const express = require('express');
const path = require('path');
const fs = require('fs')

const app = express();
bodyParser = require('body-parser')

app.use(bodyParser.json())

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

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
	console.log(req.body)
	res.json("Signup success");
})

app.post('/api/form-forgotpassword', (req,res)=> {
	console.log("forgotpassword API call")
	console.log(req.body)
	res.json("Forgot Password done");

})


// Handles any requests that don't match the ones above
app.post('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
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
	console.log("login")
	console.log(req.body)
	// console.log(res)
	// fs.writeFile('hello.JSON',JSON.stringify(req), (err)=> console.log('file wrritten'))
	res.send("Login success");
})

app.get('/api/form-signup', (req,res)=> {
	console.log("signup")
})

app.get('/api/form-forgotpassword', (req,res)=> {
	console.log("forgotpassword")
})


// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
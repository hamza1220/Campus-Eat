import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbarMod.css'
var searchIcon= require('./search.png')



class Navbar extends Component{
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(JSON.stringify(this.state.value))
        fetch('api/form-search', {  
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ "user": {
              "search" : this.state.value}
            }),
        })
        .then(res => {
          res.json().then(body => {
            console.log(body)
        }); 
      })
    }
    render() {
        return (
            <div id="navb">
                <div>Hello</div>
            </div>
        );
    }
}
export default Navbar;
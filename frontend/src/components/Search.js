import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Search.css';

class Search extends Component{
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
        console.log("searched eee")
        event.preventDefault();
      //   console.log(JSON.stringify(this.state.value))
      //   fetch('api/form-search', {  
      //       method: 'post',
      //       headers: {'Content-Type': 'application/json'},
      //       body: JSON.stringify({ "user": {
      //         "search" : this.state.value}
      //       }),
      //   })
      //   .then(res => {
      //     res.json().then(body => {
      //       console.log(body)
      //   }); 
      // })
    }

    render(){
    	return(
    		<div>
            	<form style={{border: "none", height: "100%"}} onSubmit={this.handleSubmit}>
                    <button id="searchButton"/>
                    <input placeholder= "Search for food" type="text" value={this.state.value} onChange={this.handleChange}/>
                </form>
    		</div>
    	);
    }
}

export default Search;
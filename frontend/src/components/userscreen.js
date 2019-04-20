import React, { Component } from 'react';
import user_background from './userscreen_background.jpeg'
import './userscreen.css'
import StarRatingComponent from 'react-star-rating-component'
 

export default class Userscreen extends Component {
 	constructor(props){
 		super(props);

 		this.state={
 			r1:'',
 			r2:'',
 			r3:'',
 			r4:'',
 		};

 	}
    
	componentDidMount(){
		fetch('api/rest-ratings', {
	      method: 'GET'
	    })
	    .then(res => res.json())
	    .then(body =>{
	    	this.setState({r1: body.Z})
	    	this.setState({r2: body.C})
	    	this.setState({r3: body.J})
	    	this.setState({r4: body.F})
	    	console.log(this.state.r1, this.state.r2, this.state.r3, this.state.r4)
	    })
	}

    render() {
        return (
            <div>
        		<img src={user_background} alt="" style= {{width: "100%", height: "auto", margin:"0auto"}}/>
            	<div id="btn2">
            	Chop Chop
            		<div>
            		<StarRatingComponent name="ChopChop" editing={false} starCount={5} value={parseInt(this.state.r2)}/>
            		</div>
            	</div>
            	<div id="btn3">
            		Jammin Java
            		<div>
            		<StarRatingComponent name="JamminJava" editing={false} starCount={5} value={parseInt(this.state.r3)}/>
            		</div>
            	</div>
            	<div id="btn4">
            		Flavours 
            		<div>
            		<StarRatingComponent name="Flavours" editing={false} starCount={5} value={parseInt(this.state.r4)}/>
            		</div>
            	</div>
            	<div id="btn1">
            		Zakir Tikka 
            		<div>
            		<StarRatingComponent name="Zakir" editing={false} starCount={5} value={parseInt(this.state.r1)}/>
            		</div>
            	</div>
            </div>
        );
    }
}
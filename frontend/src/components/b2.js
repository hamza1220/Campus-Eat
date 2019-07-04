import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../actions/authentication';
import MetaTags from 'react-meta-tags';
import StarRatings from './react-star-ratings';
import classnames from 'classnames';
import logo from './redlogo.png'
import '../App.css'


class b2 extends Component {

    constructor() {
        super(props);
        this.state = {
            rating: '',         
        }            
    }

    
componentDidMount(){
        
        const y= String(this.props.auth.user.user_type).split('_')[1]
        fetch('api/get_rating', {
          method: 'POST',
          body: JSON.stringify({rest: y}),
          headers: {
            "Content-Type": "application/json",
          }
        })
        .then(res => {
            res.json()
            .then(body => {
                let t = parseInt(body,10)
                this.setState({rating: t})
            }); 
        })
    }

    render() {
        const {errors} = this.state;
        return(
            <StarRatings
          rating={this.state.rating}
          starRatedColor="yellow"
          numberOfStars={5}
          name='rating'
        />
      );
        
        
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { })(b2)
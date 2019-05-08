import React, { Component } from 'react';
import { connect } from 'react-redux';
import MetaTags from 'react-meta-tags';
import StarRatings from 'react-star-ratings'
import './rest_rating.css'

var restaurant_name = ''
class blank extends Component {
    constructor(props){
         super(props);

         this.state={
      rating: -1,           
        };

    }

    componentWillMount(){
      restaurant_name = String(this.props.auth.user.user_type).split('_')[1]
    fetch('api/get_rating', {
          method: 'POST',
          body: JSON.stringify({rest: restaurant_name}),
          headers: {
            "Content-Type": "application/json",
          }
        }).then(res => res.json())
        .then(body =>{
            this.setState({rating: parseInt(body,10)})
        })
  }

    render() {
        return (
            <div id = "rating">
              &nbsp;
              <br></br>
              <br></br>
              <h1>{restaurant_name}</h1>
              <br></br><br></br>
              <br></br>
              <p> Your restaurant's current rating: </p>
              <StarRatings
                rating = {this.state.rating}
                starRatedColor="#ffd700"
                starDimension = "70px"
                numberOfStars={5}
                name = "rating"
              />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export  default connect(mapStateToProps, {})(blank)
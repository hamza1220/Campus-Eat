import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import Navbar from './Navbar'
import homeimage from './mainscreenimg.png'

class Home extends Component {
  render() {
    return (
    <div className="App">
      <Navbar/>
      <img className = "homescreen" src={homeimage} alt = ""/>       
    </div>
    );
  }
}
export default Home;
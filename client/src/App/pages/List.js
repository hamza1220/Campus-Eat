import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import Toolbar from './toolbar.js';
import SideDrawer from './SideDrawer'
import BackDrop from './BackDrop';
import './List.css'
var bg= require('./restaurantPickScreen.png')

class List extends Component {
  state= {
    sideDrawerOpen : false
  }

  drawerToggleClickHandler= ()=>{
    this.setState((prevState)=>{
      return {
        sideDrawerOpen : !prevState.sideDrawerOpen
      };
    });
  };

  backDropClickHandler= ()=>{
    this.setState({sideDrawerOpen : false});
  };
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     list: [],
  //     sideDrawerOpen: false
  //   }
  // }

  // componentDidMount() {
  //   this.getList();
  // }

  // getList = () => {
  //   fetch('/api/getList')
  //   .then(res => res.json())
  //   .then(list => this.setState({ list }))
  // }


  render() {
    let backDrop;
    if(this.state.sideDrawerOpen){
      backDrop= <BackDrop click={this.backDropClickHandler}/>;
    }
    // const { list } = this.state;

    return (
      <div style={{height: "100%"}}>
        <MetaTags>
          <meta charSet="utf-8" name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta name="theme-color" content="#B02737"/>
        </MetaTags>
        
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>
        <SideDrawer show={this.state.sideDrawerOpen}/>
        {backDrop}
        
        <main style={{marginTop: '64px'}}>
          <br></br>
          <p style={{color: "white"}}> Content comes here </p>
        </main>
        
        
      </div>
    );
  }
}

export default List;



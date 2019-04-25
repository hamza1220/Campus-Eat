<div id="navb">
    <div style= {{height: 50}}>
        <ul>
            <li style={{color: "white"}}>
                <form onSubmit={this.handleSubmit} style={{display: "inline"}}>
                    <button style ={ { backgroundImage: "url("+searchIcon+")"} }></button>
                    <input placeholder= "Search for food" type="text" value={this.state.value} onChange={this.handleChange}/>
                </form>
            </li>

            <li style={{float: "right", color: "white"}}>
                <img src={logo}/>
            </li>
        </ul>
    </div>
    <NavbarPage/>
</div>


<MDBContainer>
  <MDBNavbar color="amber lighten-4" style={{ marginTop: '0px', marginLeft: '0px'}} light>
    <MDBContainer>
      <MDBHamburgerToggler color="#FFFFFF" id="hamburger1" onClick={()=> this.toggleSingleCollapse('collapse1')} />
        <MDBCollapse isOpen={this.state.collapse1} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="/login" style={{color:"white"}}>LogOut</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
    </MDBContainer>
  </MDBNavbar>
</MDBContainer>

      <div className="App" style ={ { backgroundImage: "url("+bg+")", height : "100%" } }>
      <NavbarWithoutSignUp/>
      <br></br><br></br><br></br>
          <div style={{fontSize : '45px', backgroundColor: 'rgba(255, 255, 255, 0.8)', width: 1345, textAlign : "left", color : "#88807b", marginLeft: 10, borderRadius: 5}} >
            &#160;&#160; Choose your favourite restaurant to order food from 
          </div>
        <br></br><br></br>
        {/* Check to see if any items are found*/}
        {list.length ? (
          <div>
            {/* Render the list of items */}
            {list.map((item) => {
              return(
                <div>
                  {item}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h2>No List Items Found</h2>
          </div>
        )
      }
      </div>

      var bg= require('./restaurantPickScreen.png')


                <ul>
                    <li style={{color: "white"}}>
                        <form onSubmit={this.handleSubmit} style={{display: "inline"}}>
                            <button style ={ { backgroundImage: "url("+searchIcon+")"} }></button>
                            <input placeholder= "Search for food" type="text" value={this.state.value} onChange={this.handleChange}/>
                        </form>
                    </li>
                </ul>



    background: transparent;
  border: none;
  cursor: pointer;
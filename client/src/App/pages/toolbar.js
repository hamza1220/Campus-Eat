import React from 'react';
import logo from './whiteLogoResized.png'
import DrawerToggleButton from './DrawerToggleButton'
import Search from './Search'
import './toolbar.css'

const toolbar= props=>(
	<header className="toolbar">
		<nav className="toolbarNavigation">
			<div className="toolbarToggleButton">
				<DrawerToggleButton click={props.drawerClickHandler}/>
			</div>

			<div className="toolbarLogo"><a href="/"><img src={logo}/></a></div>
			<div className="spacer"/>
			<div className="searchObject"><Search/></div>
			<div className="toolbarNavItems">
				<ul>
					<li>
						<a href="/">Home</a>
					</li>

					<li>
						<a href="/">Test</a>
					</li>
				</ul>
			</div>
		</nav>
	</header>);

export default toolbar;
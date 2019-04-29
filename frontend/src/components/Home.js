import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import background from './homeimage.jpg'


export default class Home extends Component {
    render() {
        return (
            <div>
            	<MetaTags>
          			<meta charSet="utf-8" name="viewport" content="width=device-width, initial-scale=1.0"/>
          			<meta name="theme-color" content="#B02737"/>
        		</MetaTags>
                <img src={background} alt="" style= {{width: "100%", height: "auto"}}/>
            </div>
        );
    }
}
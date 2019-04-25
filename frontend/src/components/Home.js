import React, { Component } from 'react';
import background from './homeimage.jpeg'


export default class Home extends Component {
    render() {
        return (
            <div>
                <img src={background} alt="" style= {{width: "100%", height: "auto"}}/>
            </div>
        );
    }
}
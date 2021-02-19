import React, { Component } from 'react';

class Loader extends Component{
    render()
    {
        return(
            <div className="ui active inverted dimmer">
                <div className="ui loader"></div>
            </div>
        );
    }
}

export default Loader;
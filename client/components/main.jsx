import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

class Main extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <p>Ready to start a new game ?</p>
                <div className="group-button">
                    <a className="btn btn-primary btn-block" href="newGame">New Game</a>
                </div>
            </div>
        )
    }
}

export default createContainer(() => {
    return {
    };
}, Main);




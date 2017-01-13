import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Loading extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card text-center">
                <div className="loader"></div>
            </div>
        )
    }
}
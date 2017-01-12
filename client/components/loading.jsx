import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class Loading extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="text-center">
                <div className="loader"></div>
            </div>
        )
    }
}
import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

class RowStat extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        if (stat != "undefined")
            console.log("RowStat : ", stat.chosenCharacter);

        return (
            <div>
                <li>Une stat</li>
            </div>
        )
    }
}

export default createContainer(() => {
    return {
        stat: this.props.stat
    };
}, RowStat);




import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class Round extends Component {

    constructor(props) {
        super(props);
    }
    render() {

        if (typeof this.props.round != 'undefined' && !_.isEmpty(this.props.round)) {
            console.log("this.props.gameNumber : " + this.props.gameNumber);
            console.log("this.props.roundNumber : " + this.props.roundNumber);
            return (
                <tr className={"rounds gameNum" + this.props.gameNumber}>
                    <td>{this.props.roundNumber}</td>
                    <td>{this.props.round.question}</td>
                    <td>{this.props.round.givenAnswer}</td>
                    <td>{this.props.round.wantedAnswer}</td>
                </tr>
            )
        } else {
            return (<tr>No round found</tr>);
        }
    }
}

Round.propTypes = {
    'round': React.PropTypes.any.isRequired,
    'round': React.PropTypes.object,
    'roundNumber': React.PropTypes.number,
    'gameNumber': React.PropTypes.number,
};
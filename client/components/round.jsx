import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class Round extends Component {

    constructor(props) {
        super(props);
    }
    render() {

        console.log("round ", this.props.round);
        if (typeof this.props.round != 'undefined' && !_.isEmpty(this.props.round)) {

            if (this.props.round.response.type == 'suggestion') {
                return (
                    <tr className={"rounds gameNum" + this.props.gameNumber}>
                        <td>{this.props.roundNumber + 1}</td>
                        <td>Suggested character : <b>{this.props.round.response.name}</b></td>
                        <td>{ResponsesDisplay[this.props.round.givenAnswer]}</td>
                    </tr>
                )
            } else {
                return (
                    <tr className={"rounds gameNum" + this.props.gameNumber}>
                        <td>{this.props.roundNumber + 1}</td>
                        <td>{this.props.round.response.libelle}</td>
                        <td>{ResponsesDisplay[this.props.round.givenAnswer]}</td>
                        { /* <td>{this.props.round.wantedAnswer}</td> */}
                    </tr>
                )
            }
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
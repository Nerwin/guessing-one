import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Round from '/client/components/round';

export default class Game extends Component {

    constructor(props) {
        super(props);
    }

    showRounds() {
        $(document).ready(function () {
            $(".toggler").click(function (e) {
                e.preventDefault();
                
            });
        });
    }

    handleClick(event, instance) {
        event.preventDefault();
        $('.gameNum' + event.currentTarget.id).toggle();
    }

    renderRound() {
        let rounds = this.props.game.rounds;
        let number = this.props.number;

        return rounds.map(function (round, index) {
            return <Round key={round._id} round={round} gameNumber={number} roundNumber={index} />
        });
    }

    render() {

        if (typeof this.props.game != 'undefined' && !_.isEmpty(this.props.game)) {
            return (
                <table className="well">
                    <tbody>
                        <tr>
                            <td className="col-header">Game date</td>
                            <td className="col-header">Chosen character</td>
                            <td className="col-header">Guessed</td>
                            <td className="col-header">Total rounds</td>
                        </tr>
                        <tr>
                            <td>{moment(this.props.game.createdAt).format('DD MM YYYY')}</td>
                            <td>{this.props.game.chosenCharacter}</td>
                            <td>{this.props.game.founded == true ? 'Yes' : 'No'}</td>
                            <td><button className="btn btn-primary" type="button" id={this.props.number} onClick={this.handleClick}>{this.props.game.rounds.length}</button></td>
                        </tr>
                        <tr className={"rounds gameNum" + this.props.number}>
                            <td className="col-header">Round</td>
                            <td className="col-header">Question</td>
                            <td className="col-header">Given answer</td>
                            <td className="col-header">Wanted answer</td>
                        </tr>
                        {this.renderRound()}
                    </tbody>
                </table>
            )
        } else {
            return (<p className="text-card">No previous game found</p>);
        }
    }
};

Game.propTypes = {
    'game': React.PropTypes.any.isRequired,
    'game': React.PropTypes.object,
    'number': React.PropTypes.number,
};
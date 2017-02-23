import React, { PropTypes, Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Game from '/client/components/game.jsx';


class GameHistory extends Component {
    constructor(props) {
        super(props);
    }

    handleGoBack(event, instance) {
        event.preventDefault();
        // Handle click for sign in or sign up
    }

    renderGame() {
        let games = this.props.games;

        return games.map(function (game, index) {
            return <Game key={game._id} game={game} number={index} />
        });
    }

    render() {
        if (typeof this.props.games != "undefined" && _.size(this.props.games) > 0) {
            return (
                <div className="ui-gameHistory">
			        <div className="container">
                        {this.renderGame()}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="card text-center">
                    <p>No history games</p>
                    <p>You should sign up for have your history game</p>
                    <p>You already have an account ? Go sign in</p>
                    <div className="group-button">
                        <a className="btn btn-primary" href="connection">Sign In</a>
                    </div>
                </div>
            );
        }
    }
}

export default createContainer(() => {
    Meteor.subscribe('Games');
    let games = Games.find({}, {sort: {createdAt: -1}}).fetch();
    return {
        games: games
    };
}, GameHistory);
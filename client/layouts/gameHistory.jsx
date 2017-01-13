import React, { PropTypes, Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Game from '/client/components/game.jsx';


class GameHistory extends Component {
    constructor(props) {
        super(props);
    }


    renderGame() {
        let games = this.props.games;

        return games.map(function(game, index) {
            return <Game key={game._id} game={game} number={index}/>
        });
    }

    render() {
        if (typeof this.props.games != "undefined" && _.size(this.props.games) > 0) {
            return (
                <div className="game-history">{this.renderGame()}</div>
            );
        } else {
            return (<p>No history games</p>);
        }
    }
}

export default createContainer(() => {
    Meteor.subscribe('Games');
    let games = Games.find().fetch();
    return {
        games: games
    };
}, GameHistory);
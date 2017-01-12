import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export default class Navbar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header"><a className="navbar-brand navbar-link" href="/">Akinator South-Park</a>
                        <button className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button>
                    </div>
                    <div className="collapse navbar-collapse" id="navcol-1">
                        <ul className="nav navbar-nav">
                            <li role="presentation"><a href="newGame">New Game</a></li>
                            <li role="presentation"><a href="lastGames">Last Games</a></li>
                            <li role="presentation"><a href="statistiques">Statistiques</a></li>
                        </ul>
                        <button className="btn btn-primary navbar-btn navbar-right" type="button"><strong>SIGN UP</strong></button>
                    </div>
                </div>
            </nav>
        )
    }
}







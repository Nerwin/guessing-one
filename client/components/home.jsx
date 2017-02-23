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
            <div className="ui-main">
				<div className="ui-image">
					<i className="fa fa-heart lblue icon"></i> 
				</div>
				<div className="ui-content">
					<h2>The One Guessing <span className="green">!!!</span></h2>
					<p className="our-story">Hello dear friend ! <br /> Come play with me and I bet you I will find whom South-Park character you are thinking</p>
					<img src="/images/border.png" alt="" className="img-responsive border"/>
					<h4 className="text-center">Make your own</h4>
					<address>
						<p>Developer ? You can make your own The One Guessing from my code base linked below</p>
						<a href="mailto:smith@gmail.com"><i className="fa fa-envelope-o bg-green"></i>&nbsp; hippolyte.lac@gmail.com</a> &nbsp; 
						<a href="https://github.com/Nerwin/akinator-like"><i className="fa fa-github bg-yellow"></i>&nbsp; Nerwin</a>
					</address>
					<img src="/images/border.png" alt="" className="img-responsive border"/>
                    <div className="ui-button">
                        <a type="button" className="btn btn-default btn-green" href="newGame">Start a game</a>
                    </div>
				</div>
            </div>
        )
    }
}

export default createContainer(() => {
    return {
    };
}, Main);




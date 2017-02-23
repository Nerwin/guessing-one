import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import CountTo from 'react-count-to';
import Loading from '/client/components/loading';

class Statistiques extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event, instance) {
        event.preventDefault();
        Meteor.call('sendResponse', { idResponse: event.currentTarget.id });
    }

    render() {
        if (typeof this.props.stats == "undefined" || _.isEmpty(this.props.stats)) {
            return (<Loading />);
        } else {
            let stats = this.props.stats;
            let winRatio = Math.round(stats.characterFound * 100 / stats.playedGame) ;

            return (
                <div className="ui-statistiques">
                    <div className="row">
                        <div className="col-12 title">
                        <h2>Here are some stats from the game</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-12">
                            <div className="counter-item">
                                <i className="fa fa-gamepad yellow"></i>
                                <h4><span><CountTo from={0} to={stats.playedGame} speed={2500} delay={50}/></span><small>&nbsp; Games played</small></h4>
                                <p>It's' amazing, I couldn't imagine playing so many games</p>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-12">
                            <div className="counter-item">
                                <i className="fa fa-trophy yellow"></i>
                                <h4><span><CountTo from={0} to={stats.characterFound} speed={2600} delay={50}/></span><small>&nbsp; Games won</small></h4>                                    
                                <p>That's not bad bro ! I have a ratio of <strong><CountTo from={0} to={Number(winRatio)} speed={2600} delay={50}/></strong> %</p>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-12">
                            <div className="counter-item">
                                <i className="fa fa-meh-o yellow"></i>
                                <h4><span><CountTo from={0} to={stats.characterNotFound} speed={2700} delay={50}/></span><small>&nbsp; Games loose</small></h4>
                                <p>Hum it seems I fail sometimes ...</p>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-12">
                            <div className="counter-item">
                                <i className="fa fa-question-circle yellow"></i>
                                <h4><span><CountTo from={0} to={stats.askedQuestion} speed={2800} delay={50}/></span><small>&nbsp; Questions asked</small></h4>
                                <p>Ouaw ! that's a lot of question for my brain</p>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-12">
                            <div className="counter-item">
                                <i className="fa fa-star yellow"></i>
                                <h4><span><CountTo from={0} to={stats.mostPlayedTimes} speed={2900} delay={50}/></span><small>&nbsp; Most played times</small></h4>
                                <p><strong>{stats.mostPlayedCharacter}</strong> is the most played character</p>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-12">
                            <div className="counter-item">
                                <i className="fa fa-thumbs-down yellow"></i>
                                <h4><span><CountTo from={0} to={stats.leastPlayedTimes} speed={3000} delay={50}/></span><small>&nbsp; Least played times</small></h4>
                                <p><strong>{stats.leastPlayedCharacter}</strong> is the least played character</p>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default createContainer(() => {
    Meteor.call('findStatistiques', function (err, result) {
        if (err)
            console.error("findStatistiques : ", err);
        Session.set("stats", result);
    });

    return {
        stats: Session.get("stats"),
    };
}, Statistiques);




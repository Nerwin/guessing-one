import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import RowStat from '/client/components/rowstat';
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
        if (typeof this.props.stats == "undefined") {
            return (<Loading />);
        } else {
            return (
                _.each(this.props.stats, function (stat, index) {
                    return <li><RowStat key={stat._id} stat={game} /></li>;
                })
            )
        }
    }
}

export default createContainer(() => {
    Meteor.subscribe('Games');

    Meteor.call('findStatistiques', function (err, result) {
        if (err)
            console.error("findStatistiques : ", err);

        console.log("stats result : ", result);
        Session.set("stats", result);
    });

    return {
        stats: Session.get("stats"),
    };
}, Statistiques);




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

    renderRowStat() {
        let stats = Session.get("stats");
        console.log("stats : ", stats);

        return <RowStat key={stats._id} stats={stats} />
    }

    render() {

        if (typeof Session.get("stats") != "undefined") {
            return (<Loading />);
        } else {
            return (
                <div>
                    <ul>{this.renderRowStat()}</ul>
                </div>
            )
        }
    }
}

export default createContainer(() => {
    Meteor.subscribe('Games');

    return {
        character: Meteor.call('findStatistiques', function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log("stats result : ", result);
            Session.set("stats", result);
        }),
    };
}, Statistiques);




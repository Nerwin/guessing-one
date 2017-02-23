import { MainLayout } from '/client/main.jsx';
import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';
import React from 'react';

import App from '/client/components/app';
import Card from '/client/components/card';
import Statistiques from '/client/components/statistiques';
import Home from '/client/components/home';
import GameHistory from '/client/components/gameHistory';
import Connection from '/client/components/connection';

FlowRouter.route("/", {
    action() {
        mount(MainLayout, {
            container: () => (<Home />)
        });
    }
});

FlowRouter.route("/newGame", {
    action() {
        Meteor.call('initNewGame', function (err, result) {
            Session.set("returnedComponent", result);
        });
        mount(MainLayout, {
            container: () => (<Card />)
        });
    }
});

FlowRouter.route("/lastGames", {
    action() {
        mount(MainLayout, {
            container: () => (<GameHistory />)
        });
    }
});

FlowRouter.route("/statistiques", {
    action() {
        mount(MainLayout, {
            container: () => (<Statistiques />)
        });
    }
});

FlowRouter.route("/connection", {
    action() {
        mount(MainLayout, {
            container: () => (<Connection />)
        });
    }
});
import { MainLayout } from '/client/main.jsx';
import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';
import React from 'react';

import App from '/client/layouts/app';
import Card from '/client/components/card';
import Statistiques from '/client/components/statistiques';
import Main from '/client/components/main';
import GameHistory from '/client/layouts/gameHistory';

FlowRouter.route("/", {
    action() {
        mount(MainLayout, {
            container: () => (<Main />)
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
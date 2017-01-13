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
        console.log("newGame");
        Meteor.call('initNewGame');
        Session.set("isNewGame", true);
        mount(MainLayout, {
            container: () => (<Card />)
        });
    }
});

FlowRouter.route("/lastGames", {
    action() {
        console.log("lastGames");
        mount(MainLayout, {
            container: () => (<GameHistory />)
        });
    }
});

FlowRouter.route("/statistiques", {
    action() {
        console.log("statistiques");
        mount(MainLayout, {
            container: () => (<Statistiques />)
        });
    }
});
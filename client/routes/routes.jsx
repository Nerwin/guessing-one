import { MainLayout } from '/client/main.jsx';
import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';
import React from 'react';

import App from '/client/layouts/app';
import Card from '/client/components/card';
import Statistiques from '/client/components/statistiques';
import Main from '/client/components/main';

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
        mount(MainLayout, {
            container: () => (<Card />)
        });
    }
});

FlowRouter.route("/lastGames", {
    action() {
        console.log("lastGames");
        mount(MainLayout, {
            container: () => (<App />)
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
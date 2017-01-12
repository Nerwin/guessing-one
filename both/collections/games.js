import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

Games = new Mongo.Collection("Games");

if (Meteor.isServer) {
    Meteor.publish('Games', function gamespub() {
        return Games.find();
    });
}
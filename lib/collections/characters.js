import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

Characters = new Mongo.Collection("Characters", {
    transform: function (doc) {
        _.extend(doc, { type: 'character' });
        return doc;
    }
});

CharactersResponses = new Mongo.Collection("CharactersResponses");


if (Meteor.isServer) {
    Meteor.publish('Characters', function characterspub() {
        return Characters.find();
    });

    Meteor.publish('CharactersResponses', function charactersesponsespub() {
        return CharactersResponses.find();
    });
}
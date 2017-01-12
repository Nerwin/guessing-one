import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

Questions = new Mongo.Collection("Questions", {
    transform: function(doc) {
        _.extend(doc, {type: 'question'});
        return doc;
    }
});

if (Meteor.isServer) {
    Meteor.publish('Questions', function questionspub() {
        return Questions.find();
    });

}
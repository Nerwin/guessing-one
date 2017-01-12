
import Future from 'fibers/future';

Meteor.methods({

    getResponse(params) {
        console.log("Entry getResponse");
    },

    findNextQuestion() {
        console.log("Entry findNextQuestion");
        var future = new Future();
        let question = Questions.findOne();
        future.return(question);
        return future.wait();
    },

    suggestCharacter() {
        console.log("Entry suggestCharacter");
        var future = new Future();
        let character = Characters.findOne();
        future.return(character);
        return future.wait();
    },

    findStatistiques() {
        console.log("Entry findStatistiques");
        var future = new Future();
        let games = Games.findOne();
        future.return(games);
        return future.wait();
    },

    findNextStep() {
        console.log("Entry findNextStep");
        var scoring = 100;

        if (scoring < 10) {
            return Meteor.call('suggestCharacter');
        } else {
            return Meteor.call('findNextQuestion');
        }
    },
});


// var Jarvis = new Class({
//     'Implements': [Options],

//     //default options
//     'options': {
//         'foo': null
//     },

//     'initialize': function(options) {
//         this.foo = options.foo;
//     },

//     'getCharacters' : function() {
//        return this.foo;
//     }
// });

// var jarvis = new Jarvis({'foo': 'Hello World'});
// jarvis.getCharacters();

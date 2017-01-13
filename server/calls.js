
import Future from 'fibers/future';
// import Jarvis from '/server/jarvis';

Meteor.methods({

    initNewGame() {
        jarvis.initNewGame();
    },

    treatResponse(response) {
        console.log("Entry treatResponse");
        jarvis.updateScore(response.idResponse);
    },

    findFirstQuestion() {
        console.log("Entry findFirstQuestion");
        return jarvis.askQuestion();
    },

    suggestCharacter() {
        console.log("Entry suggestCharacter");
        let future = new Future();
        let character = Characters.findOne();
        future.return(character);
        return future.wait();
    },

    findStatistiques() {
        console.log("Entry findStatistiques");
        let future = new Future();
        let games = Games.findOne();
        future.return(games);
        return future.wait();
    },

    findNextStep(response) {
        console.log("Entry findNextStep");

        if (typeof response != 'undefined') {
            Meteor.call('treatResponse', { idResponse: response.idResponse });
        }

        return jarvis.findQuestionOrCharacter();
    },
});


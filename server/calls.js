
import Future from 'fibers/future';
// import Jarvis from '/server/jarvis';

Meteor.methods({

    initNewGame() {
        jarvis.initNewGame();
        return jarvis.findQuestionOrCharacter();
    },

    goBackToPreviousRound() {
        return jarvis.goBackToPreviousRound();
    },

    treatResponse(response) {
        console.log("Entry treatResponse");
        let responseId = Number(response.responseId);

        let previousRoundType = jarvis.getPreviousRound().response.type;
        jarvis.saveRound(responseId);

        console.log('previousRoundType', previousRoundType);
        if (previousRoundType === 'question') {
            jarvis.removePreviousQuestionAsked();
            jarvis.updateScore(responseId);
        }
        else if (previousRoundType === 'suggestion') {
            console.log('responseId ', responseId);
            console.log('typeof responseId ', typeof responseId);
            console.log('typeof Responses.yes ', typeof Responses.yes);
            if (responseId === Responses.yes)
                jarvis.setIsCharacterFound();
            else
                jarvis.removePreviousCharacterSuggested();
        }
    },

    findFirstQuestion() {
        console.log("Entry findFirstQuestion");
        return jarvis.findQuestionOrCharacter();
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
        console.log("==================");
        console.log("Entry findNextStep");

        if (typeof response != 'undefined')
            Meteor.call('treatResponse', response);

        if (jarvis.getIsCharacterFound())
            return jarvis.characterIsFound();
        else
            return jarvis.findQuestionOrCharacter();
    },
});


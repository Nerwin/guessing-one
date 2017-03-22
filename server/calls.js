
import Future from 'fibers/future';

Meteor.methods({

    initNewGame() {
        jarvis.initNewGame();
        return jarvis.findQuestionOrCharacter();
    },

    goBackToPreviousRound() {
        return jarvis.goBackToPreviousRound();
    },

    getCharactersName() {
        let characters = [];
        Characters.find().forEach(function(char) { characters.push({name: char.name, img: char.img}) });
        return characters;
    },

    treatResponse(response) {
        let responseId = Number(response.responseId);
        let previousRoundType = jarvis.getPreviousRound().response.type;
        jarvis.saveRound(responseId);

        if (previousRoundType === 'question') {
            jarvis.removePreviousQuestionAsked();
            jarvis.updateScore(responseId);
        }
        else if (previousRoundType === 'suggestion') {
            if (responseId === Responses.yes)
                jarvis.setIsCharacterFound();
            else
                jarvis.removePreviousCharacterSuggested();
        }
    },

    findFirstQuestion() {
        return jarvis.findQuestionOrCharacter();
    },

    suggestCharacter() {
        let future = new Future();
        let character = Characters.findOne();
        future.return(character);
        return future.wait();
    },

    findStatistiques() {
        let future = new Future();
        let games = Games.find().fetch();
        let stats = {};
        stats.playedGame = games.length;
        stats.characterFound = _.where(games, { founded: true }).length;
        stats.characterNotFound = stats.playedGame - stats.characterFound;
        stats.askedQuestion = 76;
        stats.mostPlayedTimes = 3;
        stats.leastPlayedTimes = 1
        stats.mostPlayedCharacter = "Cartman"
        stats.leastPlayedCharacter = "Satan";

        future.return(stats);
        return future.wait();
    },

    findNextStep(response) {
        if (typeof response != 'undefined')
            Meteor.call('treatResponse', response);

        if (jarvis.getIsCharacterFound())
            return jarvis.characterIsFound();
        else
            return jarvis.findQuestionOrCharacter();
    },

    userRegister(login, email, password) {
        Accounts.createUser({
            username: username,
            email: email,
            password: password
        });
    }
});


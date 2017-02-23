import lodash from 'lodash';

class Jarvis {
    constructor() {
    };

    initNewGame() {
        questions = Questions.find().fetch();
        characters = Characters.find().fetch();
        charactersResponses = CharactersResponses.find().fetch();
        scoringArray = [];
        attributesList = [];
        rounds = [];
        currentRound = {};
        isCharacterFound = false;

        _.each(charactersResponses, function (characterResp) {
            scoringArray.push({ characterId: characterResp.characterId, score: 0 });
        });

        let attributesName = _.reject(_.keys(charactersResponses[0]), function (name) { return name == 'characterId' || name == '_id'; });
        _.each(attributesName, function (name) {
            let attribute = { name: name, entropyResponses: [], numberOfResponses: [], gain: 0 };
            attribute = jarvis.calculateNumberOfResponse(attribute);
            attributesList.push(attribute);
        });

        numberOfCharacters = scoringArray.length;
        generalEntropy = this.calculateGeneralEntropy();
    };

    goBackToPreviousRound() {
        currentRound = _.last(rounds);
        rounds.pop();
        return currentRound.response;
    };

    setIsCharacterFound() {
        isCharacterFound = true;
    };

    getIsCharacterFound() {
        return isCharacterFound;
    };

    characterIsFound() {
        this.saveGameInCollection(true);
        currentRound.response.type = 'victory';
        currentRound.response.nbrTimesPlayed = _.where(Games.find().fetch(), { chosenCharacterId: currentRound.response._id }).length;
        return currentRound.response;
    };

    surrend() {
        currentRound.response.type = 'defeat';
        this.saveGameInCollection(false);
        return currentRound.response;
    }

    saveGameInCollection(characterIsFound) {
        let game = {};
        if (characterIsFound) {
            game.chosenCharacterName = currentRound.response.name;
            game.chosenCharacterId = currentRound.response._id;
        }
        else {// TODO changer pour récuperer celui penser par le joueur
            game.chosenCharacterName = 'Inconnu';
            game.chosenCharacterId = '';
        }

        game.createdAt = moment(new Date()._d).format('DD MM YYYY');
        game.founded = characterIsFound;
        game.rounds = rounds;

        Games.insert(game);
    };

    getPreviousRound() {
        return currentRound;
    };

    saveRound(givenAnswer) {
        currentRound.givenAnswer = Number(givenAnswer);
        currentRound.roundNumber = rounds.length + 1;
        let copiedRound = {};
        copiedRound = Object.assign(copiedRound, currentRound);
        rounds.push(copiedRound);
    };

    removePreviousQuestionAsked() {
        let previousAttributeName = currentRound.response.attribute;
        attributesList = _.reject(attributesList, function (attribute) { return attribute.name == previousAttributeName; });
    };

    removePreviousCharacterSuggested() {
        let previousCharacterId = currentRound.response._id;
        scoringArray = _.reject(scoringArray, function (element) { return element.characterId == previousCharacterId; });
        // Recalculate generalEntropy and update numberOfCharacters
        numberOfCharacters = scoringArray.length;
        generalEntropy = this.calculateGeneralEntropy();
    };

    updateScore(givenResponse) {
        let attributeOfPreviousQuestion = _.last(rounds).response.attribute;

        _.each(scoringArray, function (scoringElem) {
            let characterResp = _.findWhere(charactersResponses, { characterId: scoringElem.characterId });
            if (typeof characterResp != 'undefined') {
                let wantedAnswer = (characterResp[attributeOfPreviousQuestion]);
                scoringElem.score += ScoringValueMatrice[wantedAnswer][givenResponse];
            }
        });
    };

    findHighestScored() {
        // TODO : Filtrer scoringArray en excluant ceux etant eliminé (excluded)
        return _.max(scoringArray, function (scoringElem) { return scoringElem.score; });
    };

    findQuestionOrCharacter() {
        // Jarvis will surrend after 20 questions without find the character
        if (rounds.length > 20) {
            return this.surrend();
        }

        let highestScored = this.findHighestScored();
        let response = 'undefined';

        // TODO Ameliorer la detection d'un potentiel personnage
        if (highestScored.score > 18) {
            response = this.suggestCharacter(highestScored);
            response.type = 'suggestion';
        } else {
            response = this.askQuestion();
            response.type = 'question';
        }

        currentRound.response = response;
        return response;
    }

    askQuestion() {
        _.each(attributesList, function (attribute, index) {
            attribute.entropyResponses = jarvis.calculateEntropyPerAttribute(attribute);
            attribute.gain = jarvis.calculateGain(attribute);
            attributesList[index] = attribute;
        });

        let attributeWithBestGain = _.max(attributesList, function (attribute) { return attribute.gain; });
        let nextQuestion = _.find(questions, function (question) { return question.attribute == attributeWithBestGain.name; });

        return nextQuestion;
    };

    suggestCharacter(highestScored) {
        return _.find(characters, function (character) { return character._id == highestScored.characterId; });
    };

    calculateEntropy(numberOfResponse) {
        let entropyResult = 0;

        for (i = 0; i < numberOfResponse; i++)
            entropyResult += 1 / numberOfResponse * Math.log2(1 / numberOfResponse);

        return -entropyResult;
    };

    calculateNumberOfResponse(attribute) {
        let attrName = attribute.name;

        attribute.numberOfResponses[Responses.yes] = _.filter(charactersResponses, function (elem) { return elem[attrName] == (Responses.yes); }).length;
        attribute.numberOfResponses[Responses.probably] = _.filter(charactersResponses, function (elem) { return elem[attrName] == (Responses.probably); }).length;
        attribute.numberOfResponses[Responses.idk] = _.filter(charactersResponses, function (elem) { return elem[attrName] == (Responses.idk); }).length;
        attribute.numberOfResponses[Responses.probablynot] = _.filter(charactersResponses, function (elem) { return elem[attrName] == (Responses.probablynot); }).length;
        attribute.numberOfResponses[Responses.no] = _.filter(charactersResponses, function (elem) { return elem[attrName] == (Responses.no); }).length;

        return attribute;
    }

    calculateEntropyPerAttribute(attribute) {
        attribute.entropyResponses[Responses.yes] = this.calculateEntropy(attribute.numberOfResponses[Responses.yes]);
        attribute.entropyResponses[Responses.probably] = this.calculateEntropy(attribute.numberOfResponses[Responses.probably]);
        attribute.entropyResponses[Responses.idk] = this.calculateEntropy(attribute.numberOfResponses[Responses.idk]);
        attribute.entropyResponses[Responses.probablynot] = this.calculateEntropy(attribute.numberOfResponses[Responses.probablynot]);
        attribute.entropyResponses[Responses.no] = this.calculateEntropy(attribute.numberOfResponses[Responses.no]);

        return attribute.entropyResponses;
    };

    calculateGain(attribute) {
        let resultReponse1 = attribute.numberOfResponses[Responses.yes] / numberOfCharacters * attribute.entropyResponses[Responses.yes];
        let resultReponse2 = attribute.numberOfResponses[Responses.probably] / numberOfCharacters * attribute.entropyResponses[Responses.probably];
        let resultReponse3 = attribute.numberOfResponses[Responses.idk] / numberOfCharacters * attribute.entropyResponses[Responses.idk];
        let resultReponse4 = attribute.numberOfResponses[Responses.probablynot] / numberOfCharacters * attribute.entropyResponses[Responses.probablynot];
        let resultReponse5 = attribute.numberOfResponses[Responses.no] / numberOfCharacters * attribute.entropyResponses[Responses.no];

        attribute.gain = generalEntropy - (resultReponse1 + resultReponse2 + resultReponse3 + resultReponse4 + resultReponse5);
        return attribute.gain;
    };

    calculateGeneralEntropy() {
        let generalEntropy = 0;
        let quotient = 1.00 / scoringArray.length;

        for (let i = 0; i < scoringArray.length; i++)
            generalEntropy += quotient * Math.log2(quotient);

        return -generalEntropy;
    };
};

jarvis = new Jarvis();
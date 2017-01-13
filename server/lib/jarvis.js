class Jarvis {
    constructor() {
    };

    initNewGame() {
        questions = Questions.find().fetch();
        characters = Characters.find().fetch();
        charactersResponses = CharactersResponses.find().fetch();

        scoringArray = [];
        currentQuestion = 'undefined';
        round = 0;

        _.each(charactersResponses, function (characterResp) {
            scoringArray.push({ characterId: characterResp.characterId, score: 0, excluded: false });
        });

        attributesName = _.keys(charactersResponses[0]);
        let index = attributesName.indexOf('_id');
        if (index > -1)
            attributesName.splice(index, 1);

        attributesList = [];
        _.each(attributesName, function (name) {
            let attribute = { name: name, entropyResponses: [] };
            attributesList.push(attribute);
        });
    };

    updateScore(givenResponse) {
        console.log("entry updateScore : ", givenResponse);
        //var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });

        // TODO : Filtrer scoringArray en excluant ceux etant eliminé (excluded)
        _.each(scoringArray, function (scoringElem) {
            let characterResp = _.findWhere(charactersResponses, { characterId: scoringElem.characterId });

            if (typeof characterResp != 'undefined') {
                let wantedAnswer = (characterResp[currentQuestion.tag] - 1);
                scoringElem.score += ScoringValueMatrice[wantedAnswer][Number(givenResponse)];
            }
        });
    };

    findHighestScore() {
        console.log("entry findHighestScore");
        // TODO : Filtrer scoringArray en excluant ceux etant eliminé (excluded)
        return _.max(scoringArray, function (elem) { return elem.score; });
    };

    findQuestionOrCharacter() {
        console.log("entry findQuestionOrCharacter");

        let highestScore = this.findHighestScore();
        console.log('highestScore = ', highestScore);

        // TODO Ameliorer la detection d'un potentiel personnage
        if (highestScore.score > 50) {
            let character = _.findWhere(characters, { _id: highestScore.characterId });
            console.log("best scored is ", character.name);
            return this.suggestCharacter();
        } else {
            return this.askQuestion();
        }
    }

    askQuestion() {
        console.log("entry askQuestion");
        currentQuestion = questions[_.random(0, questions.length - 1)];

        console.log("attributesList", attributesList);

        _.each(attributesList, function (attribute, index) {
            // call calculateEntropyPerAttribute
            attributesList[index].entropyResponses = this.calculateEntropyPerAttribute(attribute);
        });
        console.log("=======");
        console.log("attributesList", attributesList);

        return currentQuestion;
    };

    suggestCharacter() {
        console.log("entry suggestCharacter");
        let highestScored = _.max(scoringArray, function (elem) { return elem.score; });
        let character = _.find(characters, function (character) { return character._id == highestScored.characterId; });
        return character;
    };

    calculateEntropy() {

    };

    calculateGain() {

    };

    calculateEntropyPerAttribute(attribute) {

        let numberPerResponses = [];

        _.each(charactersResponses, function() {
            
        });

        attribute.entropyResponses[Responses.yes] = this.calculEntropie();
        attribute.entropyResponses[Responses.probably] = this.calculEntropie();
        attribute.entropyResponses[Responses.idk] = this.calculEntropie();
        attribute.entropyResponses[Responses.probablynot] = this.calculEntropie();
        attribute.entropyResponses[Responses.no] = this.calculEntropie();
        // return an array [1,1,5,2,4]
        return [1, 1, 5, 2, 4];
    };

    // public void calculEntropiePourAttribut()
    // {
    //     calculNbrParReponse();

    //     _attributList.ElementAt(_indexActualAttribute).entropieReponse1 = calculEntropie(_attributList.ElementAt(_indexActualAttribute).nombreReponse1);


    calculateGeneralEntropy() {

    };

};

jarvis = new Jarvis();
jarvis.initNewGame();

// public void calculGain()
// {

//     double entropieGenerale = calculEntropieGenerale();
//     Attribute actualAttrib = _attributList.ElementAt(_indexActualAttribute);

//     double resultReponse1 = actualAttrib.nombreReponse1 / _nbrPersonnages * actualAttrib.entropieReponse1;
//     double resultReponse2 = actualAttrib.nombreReponse2 / _nbrPersonnages * actualAttrib.entropieReponse2;
//     double resultReponse3 = actualAttrib.nombreReponse3 / _nbrPersonnages * actualAttrib.entropieReponse3;
//     double resultReponse4 = actualAttrib.nombreReponse4 / _nbrPersonnages * actualAttrib.entropieReponse4;
//     double resultReponse5 = actualAttrib.nombreReponse5 / _nbrPersonnages * actualAttrib.entropieReponse5;

//     double gain = entropieGenerale - (resultReponse1 + resultReponse2 + resultReponse3 + resultReponse4 + resultReponse5);
//     _attributList.ElementAt(_indexActualAttribute).gain = gain;
// }

// public double calculEntropieGenerale()
// {
//     double entropieGenerale = 0;
//     double surNbrPersonne = 1.00 / (double)_nbrPersonnages;

//     for (int i = 0; i < _nbrPersonnages; i++)
//         entropieGenerale += surNbrPersonne * logDeux(surNbrPersonne);

//     return -entropieGenerale;
// }

// public void calculEntropiePourAttribut()
// {
//     calculNbrParReponse();

//     _attributList.ElementAt(_indexActualAttribute).entropieReponse1 = calculEntropie(_attributList.ElementAt(_indexActualAttribute).nombreReponse1);
//     _attributList.ElementAt(_indexActualAttribute).entropieReponse2 = calculEntropie(_attributList.ElementAt(_indexActualAttribute).nombreReponse2);
//     _attributList.ElementAt(_indexActualAttribute).entropieReponse3 = calculEntropie(_attributList.ElementAt(_indexActualAttribute).nombreReponse3);
//     _attributList.ElementAt(_indexActualAttribute).entropieReponse4 = calculEntropie(_attributList.ElementAt(_indexActualAttribute).nombreReponse4);
//     _attributList.ElementAt(_indexActualAttribute).entropieReponse5 = calculEntropie(_attributList.ElementAt(_indexActualAttribute).nombreReponse5);          
// }

// public double calculEntropie(double nbrPourUneReponse)
// {
//     double resultatEntropie = 0;

//     for (int i = 0; i < nbrPourUneReponse; i++)
//     {
//         resultatEntropie += 1/ nbrPourUneReponse * logDeux(1/ nbrPourUneReponse);
//     }

//     return -resultatEntropie;
// }

import { Meteor } from 'meteor/meteor';
import casual from 'casual';

Meteor.startup(() => {
  initDatas();
});

/* Create MOC of datas */
function initDatas() {
    console.log("init datas");

    if (Questions.find().count() < 1) {
        createQuestions();
    }

    if (Characters.find().count() < 1) {
        createCharacters();
    }

    if (Games.find().count() < 1) {
        //createGames();
    }

    jarvis.initNewGame();
};


function createCharacters() {
    var charactersResponses = getCharactersResponses();

    _.each(charactersResponses, function (characterResp) {
        var character = {name: characterResp.name, description: casual.sentence, img: (characterResp.name + ".png")};
        let randomId = Characters.insert(character);

        characterResp.characterId = randomId;
        delete characterResp.name;
        CharactersResponses.insert(characterResp);
    });
};

function createGames() {
    let game = { createdAt: '10 01 2017', rounds: [{ _id: Random.id(), roundNumber: 1, question: "Connais t'on la famille de votre personnage ?", givenAnswer: 0, wantedAnswer: 0 }, { _id: Random.id(), roundNumber: 2, question: "Votre personnage est t'il un enfant ?", givenAnswer: 0, wantedAnswer: 0 }, { _id: Random.id(), roundNumber: 3, question: "Votre personnage est t'il un humain ?", givenAnswer: 0, wantedAnswer: 0 }], founded: true, chosenCharacterId: 'JxgXvXpx742TEe99X' };
    Games.insert(game);

    game = { createdAt: '15 01 2017', rounds: [{ _id: Random.id(), roundNumber: 1, question: "Connais t'on la famille de votre personnage ?", givenAnswer: 0, wantedAnswer: 0 }, { _id: Random.id(), roundNumber: 2, question: "Votre personnage est t'il un enfant ?", givenAnswer: 0, wantedAnswer: 0 }, { _id: Random.id(), roundNumber: 3, question: "Votre personnage est t'il un humain ?", givenAnswer: 3, wantedAnswer: 0 }], founded: false, chosenCharacterId: 'oDWbBL3kKEBjMcNcZ' };
    Games.insert(game);
};

function createQuestions() {
    let questions = [
        { attribute: "FamilleConnu", libelle: "Connais-tu un membre de la famille de ton personnage ?" },
        { attribute: "EstEnfant", libelle: "Votre personnage est t-il un enfant ?" },
        { attribute: "EstHumain", libelle: "Votre personnage est t-il un humain ?" },
        { attribute: "CheveuxChatain", libelle: "Votre personnage as t-il les cheveux châtains ?" },
        { attribute: "CheveuxBlond", libelle: "Votre personnage as t-il les cheveux blonds ?" },
        { attribute: "PorteAccessoireTete", libelle: "Votre personnage porte t-il un accessoire sur la tête ?" },
        { attribute: "EnClasseDeCM1", libelle: "Votre personnage est t-il en classe de CM1 ?" },
        { attribute: "RapportAvecEcole", libelle: "Votre personnage as t-il un rapport avec l'école de South-Park ?" },
        { attribute: "ADesEnfants", libelle: "Votre personnage as t-il des un ou plusieurs enfants ?" },
        { attribute: "EstEnfantUnique", libelle: "Votre personnage est t-il enfant unique ?" },
        { attribute: "PorteLunette", libelle: "Votre personnage porte t-il des lunettes ?" },
        { attribute: "EstUnGarcon", libelle: "Votre personnage est-il un garcon ?" },
        { attribute: "EstPersonnagePrincipal", libelle: "Votre personnage est-il un personnage principal ?" },
        { attribute: "PossedePouvoir", libelle: "Votre personnage possède t-il un pouvoir ?" },
        { attribute: "PorteHabitBleu", libelle: "Votre personnage porte t-il un habit de couleur bleu ?" },
        { attribute: "RelationHomosexuelle", libelle: "Votre personnage as t-il des relations homosexuelles ?" },
        { attribute: "CheveuxLong", libelle: "Votre personnage as t-il des cheveux longs ?" },
        { attribute: "EstHandicape", libelle: "Votre personnage est-il handicape physique ou mentale ?" },
        { attribute: "EstMechant", libelle: "Votre personnage est-il de nature méchante ?" },
        { attribute: "PresentSaison1", libelle: "Votre personnage est-il présent dans la saison 1 ?" },
        { attribute: "OrigineAmericaine", libelle: "Votre personnage est-il d'origine Américaine ?" }];

    _.each(questions, function (element, index) {
        Questions.insert(element);
    });
};

function getCharactersResponses() {
    let datas = [{
        name: 'Al Super Gay', FamilleConnu: 4, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 0, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 4, EstEnfantUnique: 2, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 0, RelationHomosexuelle: 0, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 4
    }, {
        name: 'Barbrady', FamilleConnu: 4, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 0, CheveuxBlond: 4, PorteAccessoireTete: 0, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 4, EstEnfantUnique: 2, PorteLunette: 0, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 0, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 0, EstMechant: 4, PresentSaison1: 0
    }, {
        name: 'Bebe', FamilleConnu: 4, EstEnfant: 0, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 0, RapportAvecEcole: 0, ADesEnfants: 4, EstEnfantUnique: 4, PorteLunette: 4, EstUnGarcon: 4, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 0, EstHandicape: 4, EstMechant: 4, PresentSaison1: 4
    }, {
        name: 'Butters', FamilleConnu: 0, EstEnfant: 0, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 0, PorteAccessoireTete: 4, EstPersonnagePrincipal: 0, EnClasseDeCM1: 0, RapportAvecEcole: 0, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 0, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 0
    }, {
        name: 'Carol', FamilleConnu: 0, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 0, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 4, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 0, EstHandicape: 4, EstMechant: 4, PresentSaison1: 4
    }, {
        name: 'Cartman', FamilleConnu: 0, EstEnfant: 0, EstHumain: 0, CheveuxChatain: 0, CheveuxBlond: 4, PorteAccessoireTete: 0, EstPersonnagePrincipal: 0, EnClasseDeCM1: 0, RapportAvecEcole: 0, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 0, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 0, PresentSaison1: 0
    }, {
        name: 'Chef', FamilleConnu: 0, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 0, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 0, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 4, PossedePouvoir: 4, PorteHabitBleu: 0, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 0
    }, {
        name: 'Crabtree', FamilleConnu: 4, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 0, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 0, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 4, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 0, RelationHomosexuelle: 4, CheveuxLong: 0, EstHandicape: 4, EstMechant: 4, PresentSaison1: 4
    }, {
        name: 'Craig', FamilleConnu: 0, EstEnfant: 0, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 0, EstPersonnagePrincipal: 4, EnClasseDeCM1: 0, RapportAvecEcole: 0, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 0, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 0
    }, {
        name: 'Cthulu', FamilleConnu: 4, EstEnfant: 4, EstHumain: 4, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 1, OrigineAmericaine: 4, PossedePouvoir: 0, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 0, PresentSaison1: 4
    }, {
        name: 'Firkle', FamilleConnu: 4, EstEnfant: 0, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 0, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 0, EstHandicape: 4, EstMechant: 4, PresentSaison1: 4
    }, {
        name: 'Fossie', FamilleConnu: 4, EstEnfant: 0, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 0, RapportAvecEcole: 0, ADesEnfants: 4, EstEnfantUnique: 2, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 4
    }, {
        name: 'Garrison', FamilleConnu: 4, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 0, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 0, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 4, RelationHomosexuelle: 0, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 0
    }, {
        name: 'Gerald', FamilleConnu: 0, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 0, CheveuxBlond: 4, PorteAccessoireTete: 0, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 0, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 0
    }, {
        name: 'God', FamilleConnu: 4, EstEnfant: 4, EstHumain: 4, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 1, OrigineAmericaine: 4, PossedePouvoir: 0, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 4
    }, {
        name: 'Hankey', FamilleConnu: 4, EstEnfant: 4, EstHumain: 4, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 4, PossedePouvoir: 0, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 4
    }, {
        name: 'Ike', FamilleConnu: 0, EstEnfant: 0, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 0, ADesEnfants: 4, EstEnfantUnique: 4, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 4, PossedePouvoir: 4, PorteHabitBleu: 0, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 0
    }, {
        name: 'Jesus', FamilleConnu: 4, EstEnfant: 4, EstHumain: 4, CheveuxChatain: 0, CheveuxBlond: 4, PorteAccessoireTete: 0, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 4, PossedePouvoir: 0, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 0, EstHandicape: 4, EstMechant: 4, PresentSaison1: 4
    }, {
        name: 'Jimbo', FamilleConnu: 4, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 0, CheveuxBlond: 4, PorteAccessoireTete: 0, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 4
    }, {
        name: 'Jimmy', FamilleConnu: 4, EstEnfant: 0, EstHumain: 0, CheveuxChatain: 0, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 0, RapportAvecEcole: 0, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 0, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 0, EstMechant: 4, PresentSaison1: 0
    }, {
        name: 'Kenny', FamilleConnu: 0, EstEnfant: 0, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 0, PorteAccessoireTete: 0, EstPersonnagePrincipal: 0, EnClasseDeCM1: 0, RapportAvecEcole: 0, ADesEnfants: 4, EstEnfantUnique: 4, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 0, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 0
    }, {
        name: 'Kyle', FamilleConnu: 0, EstEnfant: 0, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 0, EstPersonnagePrincipal: 0, EnClasseDeCM1: 0, RapportAvecEcole: 0, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 0, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 0
    }, {
        name: 'Kyle Schwartz', FamilleConnu: 0, EstEnfant: 0, EstHumain: 0, CheveuxChatain: 0, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 0, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 4
    }, {
        name: 'Liane', FamilleConnu: 0, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 0, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 0, EstEnfantUnique: 4, PorteLunette: 4, EstUnGarcon: 4, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 0, RelationHomosexuelle: 4, CheveuxLong: 0, EstHandicape: 4, EstMechant: 4, PresentSaison1: 0
    }, {
        name: 'Linda', FamilleConnu: 0, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 0, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 0, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 4, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 0, EstHandicape: 4, EstMechant: 4, PresentSaison1: 0
    }, {
        name: 'Mackey', FamilleConnu: 4, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 0, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 0, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 0, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 0
    }, {
        name: 'Maire Mc Daniels', FamilleConnu: 4, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 4, EstEnfantUnique: 2, PorteLunette: 4, EstUnGarcon: 4, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 0, EstHandicape: 4, EstMechant: 4, PresentSaison1: 0
    }, {
        name: 'Mr Esclave', FamilleConnu: 4, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 0, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 4, EstEnfantUnique: 2, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 0, RelationHomosexuelle: 0, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 4
    }, {
        name: 'Murphy', FamilleConnu: 4, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 4, EstEnfantUnique: 2, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 4
    }, {
        name: 'Mysterion', FamilleConnu: 4, EstEnfant: 0, EstHumain: 0, CheveuxChatain: 2, CheveuxBlond: 2, PorteAccessoireTete: 0, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 4, EstEnfantUnique: 2, PorteLunette: 4, EstUnGarcon: 2, OrigineAmericaine: 2, PossedePouvoir: 0, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 4
    }, {
        name: 'Nathan', FamilleConnu: 4, EstEnfant: 0, EstHumain: 0, CheveuxChatain: 0, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 0, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 0, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 0, EstHandicape: 0, EstMechant: 0, PresentSaison1: 4
    }, {
        name: 'Ned', FamilleConnu: 4, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 0, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 0, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 0, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 0, EstMechant: 4, PresentSaison1: 4
    }, {
        name: 'Pc Principal', FamilleConnu: 4, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 0, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 0, ADesEnfants: 2, EstEnfantUnique: 2, PorteLunette: 0, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 0, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 4
    }, {
        name: 'Phillip', FamilleConnu: 4, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 0, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 4, PossedePouvoir: 4, PorteHabitBleu: 0, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 0
    }, {
        name: 'Pip', FamilleConnu: 4, EstEnfant: 0, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 0, PorteAccessoireTete: 0, EstPersonnagePrincipal: 4, EnClasseDeCM1: 0, RapportAvecEcole: 0, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 4, PossedePouvoir: 4, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 0, EstHandicape: 4, EstMechant: 4, PresentSaison1: 4
    }, {
        name: 'Randy', FamilleConnu: 0, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 0, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 0, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 0
    }, {
        name: 'Sadam', FamilleConnu: 4, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 4, EstEnfantUnique: 2, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 4, PossedePouvoir: 4, PorteHabitBleu: 4, RelationHomosexuelle: 0, CheveuxLong: 4, EstHandicape: 4, EstMechant: 0, PresentSaison1: 4
    }, {
        name: 'Satan', FamilleConnu: 4, EstEnfant: 4, EstHumain: 4, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 4, PossedePouvoir: 0, PorteHabitBleu: 4, RelationHomosexuelle: 0, CheveuxLong: 4, EstHandicape: 4, EstMechant: 0, PresentSaison1: 4
    }, {
        name: 'Savant Fou', FamilleConnu: 4, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 0, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 4
    }, {
        name: 'Servietsky', FamilleConnu: 4, EstEnfant: 4, EstHumain: 4, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 4, PossedePouvoir: 4, PorteHabitBleu: 0, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 4
    }, {
        name: 'Sharon', FamilleConnu: 0, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 0, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 0, EstEnfantUnique: 4, PorteLunette: 4, EstUnGarcon: 4, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 0, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 0
    }, {
        name: 'Sheila', FamilleConnu: 0, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 0, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 4, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 0, RelationHomosexuelle: 4, CheveuxLong: 0, EstHandicape: 4, EstMechant: 4, PresentSaison1: 0
    }, {
        name: 'Shelly', FamilleConnu: 0, EstEnfant: 0, EstHumain: 0, CheveuxChatain: 0, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 3, ADesEnfants: 4, EstEnfantUnique: 4, PorteLunette: 4, EstUnGarcon: 4, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 0, EstHandicape: 4, EstMechant: 4, PresentSaison1: 0
    }, {
        name: 'Stan', FamilleConnu: 0, EstEnfant: 0, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 0, EstPersonnagePrincipal: 0, EnClasseDeCM1: 0, RapportAvecEcole: 0, ADesEnfants: 4, EstEnfantUnique: 4, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 0, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 0
    }, {
        name: 'Stephen', FamilleConnu: 0, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 0, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 0, EstEnfantUnique: 4, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 4
    }, {
        name: 'Stuart', FamilleConnu: 0, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 0, CheveuxBlond: 4, PorteAccessoireTete: 0, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 0, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 0, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 4
    }, {
        name: 'Terance', FamilleConnu: 4, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 4, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 4, PossedePouvoir: 4, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 0
    }, {
        name: 'Timmy', FamilleConnu: 4, EstEnfant: 0, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 0, RapportAvecEcole: 0, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 0, EstMechant: 4, PresentSaison1: 0
    }, {
        name: 'Token', FamilleConnu: 0, EstEnfant: 0, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 0, RapportAvecEcole: 0, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 4, PossedePouvoir: 4, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 0
    }, {
        name: 'Tweek', FamilleConnu: 4, EstEnfant: 0, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 0, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 0, RapportAvecEcole: 0, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 0, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 4, EstHandicape: 4, EstMechant: 4, PresentSaison1: 4
    }, {
        name: 'Victoria', FamilleConnu: 4, EstEnfant: 4, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 0, PorteAccessoireTete: 4, EstPersonnagePrincipal: 4, EnClasseDeCM1: 4, RapportAvecEcole: 0, ADesEnfants: 4, EstEnfantUnique: 2, PorteLunette: 0, EstUnGarcon: 4, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 0, EstHandicape: 4, EstMechant: 4, PresentSaison1: 0
    }, { name: 'Wendy', FamilleConnu: 4, EstEnfant: 0, EstHumain: 0, CheveuxChatain: 4, CheveuxBlond: 4, PorteAccessoireTete: 0, EstPersonnagePrincipal: 4, EnClasseDeCM1: 0, RapportAvecEcole: 0, ADesEnfants: 4, EstEnfantUnique: 0, PorteLunette: 4, EstUnGarcon: 4, OrigineAmericaine: 0, PossedePouvoir: 4, PorteHabitBleu: 4, RelationHomosexuelle: 4, CheveuxLong: 0, EstHandicape: 4, EstMechant: 4, PresentSaison1: 0 }];

    return datas;
};
import { Meteor } from 'meteor/meteor';
import casual from 'casual';


Meteor.startup(() => {
  initDatas();
});



/* Create MOC of datas */
function initDatas() {

    if (Questions.find().count() < 1) {
        createQuestions();
    }

    if (Characters.find().count() < 1) {
        createCharacters();
    }

    if (Games.find().count() < 1) {
        createGames();
    }
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
    let game = { createdAt: moment(new Date())._d, rounds: [{ _id: Random.id(), roundNumber: 1, question: "Connais t'on la famille de votre personnage ?", givenAnswer: 0, wantedAnswer: 0 }, { _id: Random.id(), roundNumber: 2, question: "Votre personnage est t'il un enfant ?", givenAnswer: 0, wantedAnswer: 0 }, { _id: Random.id(), roundNumber: 3, question: "Votre personnage est t'il un humain ?", givenAnswer: 0, wantedAnswer: 0 }], founded: true, chosenCharacter: 'Cartman' };
    Games.insert(game);

    game = { createdAt: moment(new Date())._d, rounds: [{ _id: Random.id(), roundNumber: 1, question: "Connais t'on la famille de votre personnage ?", givenAnswer: 0, wantedAnswer: 0 }, { _id: Random.id(), roundNumber: 2, question: "Votre personnage est t'il un enfant ?", givenAnswer: 0, wantedAnswer: 0 }, { _id: Random.id(), roundNumber: 3, question: "Votre personnage est t'il un humain ?", givenAnswer: 3, wantedAnswer: 0 }], founded: false, chosenCharacter: 'Kyle' };
    Games.insert(game);
};

function createQuestions() {
    let questions = [
        { tag: "FamilleConnu", libelle: "Connais-tu un membre de la famille de ton personnage ?" },
        { tag: "EstEnfant", libelle: "Votre personnage est t-il un enfant ?" },
        { tag: "EstHumain", libelle: "Votre personnage est t-il un humain ?" },
        { tag: "CheveuxChatain", libelle: "Votre personnage as t-il les cheveux châtains ?" },
        { tag: "CheveuxBlond", libelle: "Votre personnage as t-il les cheveux blonds ?" },
        { tag: "PorteAccessoireTete", libelle: "Votre personnage porte t-il un accessoire sur la tête ?" },
        { tag: "EnClasseDeCM1", libelle: "Votre personnage est t-il en classe de CM1 ?" },
        { tag: "RapportAvecEcole", libelle: "Votre personnage as t-il un rapport avec l'école de South-Park ?" },
        { tag: "ADesEnfants", libelle: "Votre personnage as t-il des un ou plusieurs enfants ?" },
        { tag: "EstEnfantUnique", libelle: "Votre personnage est t-il enfant unique ?" },
        { tag: "PorteLunette", libelle: "Votre personnage porte t-il des lunettes ?" },
        { tag: "EstUnGarcon", libelle: "Votre personnage est-il un garcon ?" },
        { tag: "EstPersonnagePrincipal", libelle: "Votre personnage est-il un personnage principal ?" },
        { tag: "PossedePouvoir", libelle: "Votre personnage possède t-il un pouvoir ?" },
        { tag: "PorteHabitBleu", libelle: "Votre personnage porte t-il un habit de couleur bleu ?" },
        { tag: "RelationHomosexuelle", libelle: "Votre personnage as t-il des relations homosexuelles ?" },
        { tag: "CheveuxLong", libelle: "Votre personnage as t-il des cheveux longs ?" },
        { tag: "EstHandicape", libelle: "Votre personnage est-il handicape physique ou mentale ?" },
        { tag: "EstMechant", libelle: "Votre personnage est-il de nature méchante ?" },
        { tag: "PresentSaison1", libelle: "Votre personnage est-il présent dans la saison 1 ?" }];

    _.each(questions, function (element, index) {
        Questions.insert(element);
    });
};

function getCharactersResponses() {
    let datas = [{
        name: 'Al Super Gay', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 3, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 1, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
        name: 'Barbrady', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 3, PorteLunette: 1, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 1, EstMechant: 5, PresentSaison1: 1
    }, {
        name: 'Bebe', FamilleConnu: 5, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 5, PorteLunette: 5, EstUnGarcon: 5, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
        name: 'Butters', FamilleConnu: 1, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 1, PorteAccessoireTete: 5, EstPersonnagePrincipal: 1, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
        name: 'Carol', FamilleConnu: 1, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 1, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 5, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
        name: 'Cartman', FamilleConnu: 1, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 1, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 1, PresentSaison1: 1
    }, {
        name: 'Chef', FamilleConnu: 1, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 5, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
        name: 'Crabtree', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 5, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
        name: 'Craig', FamilleConnu: 1, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
        name: 'Cthulu', FamilleConnu: 5, EstEnfant: 5, EstHumain: 5, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 2, OrigineAmericaine: 5, PossedePouvoir: 1, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 1, PresentSaison1: 5
    }, {
        name: 'Firkle', FamilleConnu: 5, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
        name: 'Fossie', FamilleConnu: 5, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 3, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
        name: 'Garrison', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 1, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 1, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
        name: 'Gerald', FamilleConnu: 1, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 1, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
        name: 'God', FamilleConnu: 5, EstEnfant: 5, EstHumain: 5, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 2, OrigineAmericaine: 5, PossedePouvoir: 1, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
        name: 'Hankey', FamilleConnu: 5, EstEnfant: 5, EstHumain: 5, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 5, PossedePouvoir: 1, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
        name: 'Ike', FamilleConnu: 1, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 5, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 5, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
        name: 'Jesus', FamilleConnu: 5, EstEnfant: 5, EstHumain: 5, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 5, PossedePouvoir: 1, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
        name: 'Jimbo', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
        name: 'Jimmy', FamilleConnu: 5, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 1, EstMechant: 5, PresentSaison1: 1
    }, {
        name: 'Kenny', FamilleConnu: 1, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 1, PorteAccessoireTete: 1, EstPersonnagePrincipal: 1, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 5, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 1, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
        name: 'Kyle', FamilleConnu: 1, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 1, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
        name: 'Kyle Schwartz', FamilleConnu: 1, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 1, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
        name: 'Liane', FamilleConnu: 1, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 1, EstEnfantUnique: 5, PorteLunette: 5, EstUnGarcon: 5, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
        name: 'Linda', FamilleConnu: 1, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 1, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 1, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 5, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
        name: 'Mackey', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 1, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
        name: 'Maire Mc Daniels', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 3, PorteLunette: 5, EstUnGarcon: 5, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
        name: 'Mr Esclave', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 3, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 1, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
        name: 'Murphy', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 3, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
        name: 'Mysterion', FamilleConnu: 5, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 3, CheveuxBlond: 3, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 3, PorteLunette: 5, EstUnGarcon: 3, OrigineAmericaine: 3, PossedePouvoir: 1, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
        name: 'Nathan', FamilleConnu: 5, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 1, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 1, EstMechant: 1, PresentSaison1: 5
    }, {
        name: 'Ned', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 1, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 1, EstMechant: 5, PresentSaison1: 5
    }, {
        name: 'Pc Principal', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 1, ADesEnfants: 3, EstEnfantUnique: 3, PorteLunette: 1, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
        name: 'Phillip', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 1, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 5, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
        name: 'Pip', FamilleConnu: 5, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 1, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 5, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
        name: 'Randy', FamilleConnu: 1, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 1, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
        name: 'Sadam', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 3, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 5, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 1, CheveuxLong: 5, EstHandicape: 5, EstMechant: 1, PresentSaison1: 5
    }, {
        name: 'Satan', FamilleConnu: 5, EstEnfant: 5, EstHumain: 5, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 5, PossedePouvoir: 1, PorteHabitBleu: 5, RelationHomosexuelle: 1, CheveuxLong: 5, EstHandicape: 5, EstMechant: 1, PresentSaison1: 5
    }, {
        name: 'Savant Fou', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
        name: 'Servietsky', FamilleConnu: 5, EstEnfant: 5, EstHumain: 5, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 5, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
        name: 'Sharon', FamilleConnu: 1, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 1, EstEnfantUnique: 5, PorteLunette: 5, EstUnGarcon: 5, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
        name: 'Sheila', FamilleConnu: 1, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 1, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 5, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
        name: 'Shelly', FamilleConnu: 1, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 4, ADesEnfants: 5, EstEnfantUnique: 5, PorteLunette: 5, EstUnGarcon: 5, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
        name: 'Stan', FamilleConnu: 1, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 1, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 5, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
        name: 'Stephen', FamilleConnu: 1, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 1, EstEnfantUnique: 5, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
        name: 'Stuart', FamilleConnu: 1, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 1, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
        name: 'Terance', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 5, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
        name: 'Timmy', FamilleConnu: 5, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 1, EstMechant: 5, PresentSaison1: 1
    }, {
        name: 'Token', FamilleConnu: 1, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 5, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
        name: 'Tweek', FamilleConnu: 5, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 1, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
        name: 'Victoria', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 1, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 3, PorteLunette: 1, EstUnGarcon: 5, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, { name: 'Wendy', FamilleConnu: 5, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarcon: 5, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1 }];

    return datas;
};
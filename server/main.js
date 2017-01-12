import { Meteor } from 'meteor/meteor';
import casual from 'casual';

function createCharacters() {
  var charactersResp = CharactersResponses.find().fetch();

  _.each(charactersResp, function (element, index) {

    var name = element.Name;
    var id = element._id;
    var img = name + ".png";

    var character = { name: name, description: casual.sentence, img: img, responseId: id };
    Characters.insert(character);
  });
}

function createGame() {
  var questions = [{ libelle: "Connais t'on la famille de votre personnage ?", tag: 'FamilleConnu' },
  { libelle: "Votre personnage est t'il un enfant ?", tag: 'EstEnfant' },
  { libelle: "Votre personnage est t'il un humain ?", tag: 'EstHumain' }]

  var ids = [];

  _.each(questions, function (element, index) {
    ids.push(Questions.insert(element));
  });

  var game = { createdAt: moment(new Date())._d, rounds: [{ _id: Random.id(), roundNumber: 1, questionId: ids[0], givenAnswer: 0, wantedAnswer: 0 }, { _id: Random.id(), roundNumber: 2, questionId: ids[1], givenAnswer: 0, wantedAnswer: 0 }, { _id: Random.id(), roundNumber: 3, questionId: ids[2], givenAnswer: 0, wantedAnswer: 0 }], founded: true, chosenCharacter: 'Cartman' };
  Games.insert(game);
}

Meteor.startup(() => {


  if (CharactersResponses.find().count() < 1) {
    var datas = [{
      Name: 'Al Super Gay', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 3, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 1, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
      Name: 'Barbrady', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 3, PorteLunette: 1, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 1, EstMechant: 5, PresentSaison1: 1
    }, {
      Name: 'Bebe', FamilleConnu: 5, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 5, PorteLunette: 5, EstUnGarçon: 5, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
      Name: 'Butters', FamilleConnu: 1, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 1, PorteAccessoireTete: 5, EstPersonnagePrincipal: 1, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
      Name: 'Carol', FamilleConnu: 1, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 1, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 5, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
      Name: 'Cartman', FamilleConnu: 1, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 1, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 1, PresentSaison1: 1
    }, {
      Name: 'Chef', FamilleConnu: 1, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 5, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
      Name: 'Crabtree', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 5, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
      Name: 'Craig', FamilleConnu: 1, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
      Name: 'Cthulu', FamilleConnu: 5, EstEnfant: 5, EstHumain: 5, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 2, OrigineAmericaine: 5, PossedePouvoir: 1, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 1, PresentSaison1: 5
    }, {
      Name: 'Firkle', FamilleConnu: 5, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
      Name: 'Fossie', FamilleConnu: 5, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 3, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
      Name: 'Garrison', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 1, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 1, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
      Name: 'Gerald', FamilleConnu: 1, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 1, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
      Name: 'God', FamilleConnu: 5, EstEnfant: 5, EstHumain: 5, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 2, OrigineAmericaine: 5, PossedePouvoir: 1, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
      Name: 'Hankey', FamilleConnu: 5, EstEnfant: 5, EstHumain: 5, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 5, PossedePouvoir: 1, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
      Name: 'Ike', FamilleConnu: 1, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 5, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 5, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
      Name: 'Jesus', FamilleConnu: 5, EstEnfant: 5, EstHumain: 5, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 5, PossedePouvoir: 1, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
      Name: 'Jimbo', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
      Name: 'Jimmy', FamilleConnu: 5, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 1, EstMechant: 5, PresentSaison1: 1
    }, {
      Name: 'Kenny', FamilleConnu: 1, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 1, PorteAccessoireTete: 1, EstPersonnagePrincipal: 1, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 5, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 1, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
      Name: 'Kyle', FamilleConnu: 1, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 1, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
      Name: 'Kyle Schwartz', FamilleConnu: 1, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 1, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
      Name: 'Liane', FamilleConnu: 1, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 1, EstEnfantUnique: 5, PorteLunette: 5, EstUnGarçon: 5, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
      Name: 'Linda', FamilleConnu: 1, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 1, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 1, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 5, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
      Name: 'Mackey', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 1, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
      Name: 'Maire Mc Daniels', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 3, PorteLunette: 5, EstUnGarçon: 5, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
      Name: 'Mr Esclave', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 3, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 1, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
      Name: 'Murphy', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 3, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
      Name: 'Mysterion', FamilleConnu: 5, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 3, CheveuxBlond: 3, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 3, PorteLunette: 5, EstUnGarçon: 3, OrigineAmericaine: 3, PossedePouvoir: 1, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
      Name: 'Nathan', FamilleConnu: 5, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 1, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 1, EstMechant: 1, PresentSaison1: 5
    }, {
      Name: 'Ned', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 1, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 1, EstMechant: 5, PresentSaison1: 5
    }, {
      Name: 'Pc Principal', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 1, ADesEnfants: 3, EstEnfantUnique: 3, PorteLunette: 1, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
      Name: 'Phillip', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 1, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 5, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
      Name: 'Pip', FamilleConnu: 5, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 1, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 5, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
      Name: 'Randy', FamilleConnu: 1, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 1, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
      Name: 'Sadam', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 3, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 5, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 1, CheveuxLong: 5, EstHandicape: 5, EstMechant: 1, PresentSaison1: 5
    }, {
      Name: 'Satan', FamilleConnu: 5, EstEnfant: 5, EstHumain: 5, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 5, PossedePouvoir: 1, PorteHabitBleu: 5, RelationHomosexuelle: 1, CheveuxLong: 5, EstHandicape: 5, EstMechant: 1, PresentSaison1: 5
    }, {
      Name: 'Savant Fou', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
      Name: 'Servietsky', FamilleConnu: 5, EstEnfant: 5, EstHumain: 5, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 5, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
      Name: 'Sharon', FamilleConnu: 1, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 1, EstEnfantUnique: 5, PorteLunette: 5, EstUnGarçon: 5, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
      Name: 'Sheila', FamilleConnu: 1, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 1, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 5, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
      Name: 'Shelly', FamilleConnu: 1, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 4, ADesEnfants: 5, EstEnfantUnique: 5, PorteLunette: 5, EstUnGarçon: 5, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
      Name: 'Stan', FamilleConnu: 1, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 1, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 5, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
      Name: 'Stephen', FamilleConnu: 1, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 1, EstEnfantUnique: 5, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
      Name: 'Stuart', FamilleConnu: 1, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 1, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 1, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 1, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
      Name: 'Terance', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 5, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 5, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
      Name: 'Timmy', FamilleConnu: 5, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 1, EstMechant: 5, PresentSaison1: 1
    }, {
      Name: 'Token', FamilleConnu: 1, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 5, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, {
      Name: 'Tweek', FamilleConnu: 5, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 1, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 1, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 5, EstHandicape: 5, EstMechant: 5, PresentSaison1: 5
    }, {
      Name: 'Victoria', FamilleConnu: 5, EstEnfant: 5, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 1, PorteAccessoireTete: 5, EstPersonnagePrincipal: 5, EnClasseDeCM1: 5, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 3, PorteLunette: 1, EstUnGarçon: 5, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1
    }, { Name: 'Wendy', FamilleConnu: 5, EstEnfant: 1, EstHumain: 1, CheveuxChatain: 5, CheveuxBlond: 5, PorteAccessoireTete: 1, EstPersonnagePrincipal: 5, EnClasseDeCM1: 1, RapportAvecEcole: 1, ADesEnfants: 5, EstEnfantUnique: 1, PorteLunette: 5, EstUnGarçon: 5, OrigineAmericaine: 1, PossedePouvoir: 5, PorteHabitBleu: 5, RelationHomosexuelle: 5, CheveuxLong: 1, EstHandicape: 5, EstMechant: 5, PresentSaison1: 1 }];

    datas.forEach(function (element) {

      CharactersResponses.insert(element);

    });
  }

  if (Characters.find().count() < 1) {
    createCharacters();
  }
  
  if (Games.find().count() < 1) {
    createGame();
  }

  



});

import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class Character extends Component {

  constructor(props) {
    super(props);
  }

  imgError(event) {
    event.target.src = "/images/Inconnu.png";
  }

  render() {
    let characterName = "Inconnu";
    let characterText = "Aucune description";
    let characterImg = "/images/inconnu.png";

    if (typeof this.props.character != "undefined") {
      character = this.props.character;
      characterName = character.name;
      characterText = character.description;
      characterImg = "/images/" + character.img;
    }

    console.log("Character render : " + characterName);

    return (
      <div>
        <img src={characterImg} className="img-card" onError={this.imgError}></img>
        <h2 className="name-card">{characterName}</h2>
        <p className="text-card">{characterText}</p>
      </div>
    )
  }
}

Character.propTypes = {
  'character': React.PropTypes.object,
};
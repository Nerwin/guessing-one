import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class Character extends Component {

  constructor(props) {
    super(props);
    this.handleResponseOfSuggestedCharacter = this.handleResponseOfSuggestedCharacter.bind(this);
  }

  imgError(event) {
    event.target.src = "/images/characters/Inconnu.png";
  }

  handleResponseOfSuggestedCharacter(event, instance) {
    event.preventDefault();
    Meteor.call('findNextStep', { responseId: event.currentTarget.id }, function (err, result) {
      Session.set("returnedComponent", result);
    });
  }

  render() {
    let characterName = "Inconnu";
    let characterText = "As a shadow you will never see me, but i can be everywhere, if you are not looking";
    let characterImg = "/images/characters/Inconnu.png";

    if (typeof this.props.character != "undefined") {
      character = this.props.character;
      characterName = character.name;
      characterText = character.description;
      characterImg = "/images/characters/" + character.img;
    }

    return (
      <div className="ui-character">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="ui-item clearfix">
                <div className="ui-left">
                  <img src={characterImg} alt="" className="img-responsive" />
                  <div className="ui-progress clearfix">
                    <h3>{characterName}</h3>	
                    <h4>Certainty <span>40%</span></h4>
                    <div className="progress">
                      <div className="progress-bar bg-lblue" style={{width: "40%"}}></div>
                    </div>
                  </div>
                </div>	
                <div className="ui-right" style={{backgroundColor: "#f75353"}}>
                  <h3>{characterName}</h3>
                  <p>{characterText}</p>
                  <button className="btn" type="button" id={Responses.yes} onClick={this.handleResponseOfSuggestedCharacter}>Yes</button>
                  <button className="btn" type="button" id={Responses.no} onClick={this.handleResponseOfSuggestedCharacter}>No</button>
                </div>	
						  </div>
					  </div>
          </div>
        </div>
      </div>
    );
  }
}

Character.propTypes = {
  'character': React.PropTypes.object,
};
import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Character from '/client/components/character';
import Question from '/client/components/question';
import Loading from '/client/components/loading';
import Victory from '/client/components/victory';
import Defeat from '/client/components/defeat';

var firsRender = false;

class Card extends Component {

  constructor(props) {
    super(props);
    this.handleResponseOfAskingQuestion = this.handleResponseOfAskingQuestion.bind(this);
  }

  handleResponseOfAskingQuestion(event, instance) {
    event.preventDefault();
    Meteor.call('findNextStep', { responseId: event.currentTarget.id }, function (err, result) {
      Session.set("returnedComponent", result);
    });
  }

  handleResponseOfSuggestedCharacter(event, instance) {
    event.preventDefault();
    Meteor.call('findNextStep', { responseId: event.currentTarget.id }, function (err, result) {
      Session.set("returnedComponent", result);
    });
  }

  render() {
    if (typeof this.props.returnedComponent != 'undefined') {
      if (this.props.returnedComponent.type === 'question') {
        return (
          <div className="card text-center">
            <Question question={this.props.returnedComponent} />
            <div className="group-button">
              <button className="btn btn-block" type="button" style={{ backgroundColor: "#449D44", color: "#fff" }} id={Responses.yes} onClick={this.handleResponseOfAskingQuestion}>Yes</button>
              <button className="btn btn-block" type="button" style={{ backgroundColor: "#698B47", color: "#fff" }} id={Responses.probably} onClick={this.handleResponseOfAskingQuestion}>Probably</button>
              <button className="btn btn-block" type="button" style={{ backgroundColor: "#8F784A", color: "#fff" }} id={Responses.idk} onClick={this.handleResponseOfAskingQuestion}>I don't know</button>
              <button className="btn btn-block" type="button" style={{ backgroundColor: "#B4664C", color: "#fff" }} id={Responses.probablynot} onClick={this.handleResponseOfAskingQuestion}>Probably not</button>
              <button className="btn btn-block" type="button" style={{ backgroundColor: "#D9534F", color: "#fff" }} id={Responses.no} onClick={this.handleResponseOfAskingQuestion}>No</button>
            </div>
          </div>
        )
      } else if (this.props.returnedComponent.type === 'suggestion') {
        return (
          <Character character={this.props.returnedComponent} />
        )
      } else if (this.props.returnedComponent.type === 'victory') {
        return (
          <div className="card text-center">
            <Victory data={this.props.returnedComponent} />
          </div>
        )
      } else if (this.props.returnedComponent.type === 'defeat') {
        return (
          <div className="card text-center">
            <Defeat data={this.props.returnedComponent} />
          </div>
        )
      }
    } else {
      return (
        <Loading />
      )
    }
  }
};

Card.propTypes = {
  'returnedComponent': React.PropTypes.object,
};

export default createContainer(() => {

  if (Session.get("returnedComponent") === 'undefined') {
    Meteor.call('findFirstQuestion', function (err, result) {
      Session.set("returnedComponent", result);
    });
  };

  return {
    returnedComponent: Session.get('returnedComponent')
  };
}, Card);
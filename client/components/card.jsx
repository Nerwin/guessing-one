import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Character from '/client/components/character';
import Question from '/client/components/question';
import Loading from '/client/components/loading';

var firsRender = false;

class Card extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, instance) {
    console.log("Entry handleClick");
    event.preventDefault();
    Meteor.call('findNextStep', { idResponse: event.currentTarget.id }, function (err, result) {
      if (err) {
        console.error("handleCLick - findNextStep() ", err);
      }
      Session.set("returnedComponent", result);
    });
  }

  render() {
    if (typeof this.props.returnedComponent != 'undefined' && this.props.returnedComponent.type === 'question') {

      let question = this.props.returnedComponent;

      return (
        <div className="card text-center">
          <Question key={question._id} question={question} />
          <div className="group-button">
            <button className="btn btn-block" type="button" style={{backgroundColor: "#449D44", color: "#fff"}} id={Responses.yes} onClick={this.handleClick}>Yes</button>
            <button className="btn btn-block" type="button" style={{backgroundColor: "#698B47", color: "#fff"}} id={Responses.probably} onClick={this.handleClick}>Probably</button>
            <button className="btn btn-block" type="button" style={{backgroundColor: "#8F784A", color: "#fff"}} id={Responses.idk} onClick={this.handleClick}>I don't know</button>
            <button className="btn btn-block" type="button" style={{backgroundColor: "#B4664C", color: "#fff"}} id={Responses.probablynot} onClick={this.handleClick}>Probably not</button>
            <button className="btn btn-block" type="button" style={{backgroundColor: "#D9534F", color: "#fff"}} id={Responses.no} onClick={this.handleClick}>No</button>
          </div>
        </div>
      )
    } else if (typeof this.props.returnedComponent != 'undefined' && this.props.returnedComponent.type === 'character') {
      let character = this.props.returnedComponent;
      return (
        <div className="card text-center">
          <Character key={character._id} character={character} />
          <div className="group-button">
            <button className="btn btn-success btn-block" type="button" id={Responses.yes} onClick={this.handleClick}>Yes</button>
            <button className="btn btn-warning btn-block" type="button" id={Responses.no} onClick={this.handleClick}>No</button>
          </div>
        </div>
      )
    } else {
      console.log("Error - loading");
      console.log("this.props = ", this.props);
      return (
        <Loading />
      )
    }
  }
};

Card.propTypes = {
  'returnedComponent': React.PropTypes.object,
  // 'returnedComponent': React.PropTypes.any.isRequired,
};

export default createContainer(() => {
  console.log("Card createContainer");

  // TODO Optimiser cette partie ...
  if (Session.get("isNewGame") == true) {
    console.log("firstRender");
    Session.set("isNewGame", false);
    Meteor.call('findFirstQuestion', function (err, result) {
      Session.set("returnedComponent", result);
    });
  }

  return {
    returnedComponent: Session.get('returnedComponent')
  };
}, Card);
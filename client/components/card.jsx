import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Character from '/client/components/character';
import Question from '/client/components/question';
import Loading from '/client/components/loading';

class Card extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, instance) {
    event.preventDefault();
    Meteor.call('getResponse', { idResponse: event.currentTarget.id });
  }

  render() {
    if (typeof this.props.returnedComponent != 'undefined' && this.props.returnedComponent.type === 'question') {

      let question = this.props.returnedComponent;
      console.log("Hello question", question);

      return (
        <div className="text-center">
          <Question key={question._id} question={question} />
          <div className="group-button">
            <button className="btn btn-success btn-block" type="button" id={Responses.yes} onClick={this.handleClick}>Yes</button>
            <button className="btn btn-warning btn-block" type="button" id={Responses.no} onClick={this.handleClick}>No</button>
          </div>
        </div>
      )
    } else if (typeof this.props.returnedComponent != 'undefined' && this.props.returnedComponent.type === 'character') {

      console.log("Hello character");
      let character = this.props.returnedComponent;
      return (
        <div>
          <Character key={character._id} character={character} />
          <div className="group-button">
            <button className="btn btn-success btn-block" type="button" id={Responses.yes} onClick={this.handleClick}>Yes</button>
            <button className="btn btn-success btn-block" type="button" id={Responses.probably} onClick={this.handleClick}>Probably</button>
            <button className="btn btn-success btn-block" type="button" id={Responses.idk} onClick={this.handleClick}>I don't know</button>
            <button className="btn btn-success btn-block" type="button" id={Responses.probablynot} onClick={this.handleClick}>Probably not</button>
            <button className="btn btn-success btn-block" type="button" id={Responses.no} onClick={this.handleClick}>No</button>
          </div>
        </div>
      )
    } else {
      return (
        <Loading />
      )
    }
  }
}

export default createContainer(() => {

  Meteor.call('findNextStep', function (err, result) {
    Session.set("returnedComponent", result);
  });

  return {
    returnedComponent: Session.get('returnedComponent')
  };
}, Card);


// Card.propTypes = {
//   'returnedComponent': React.PropTypes.object,
// };




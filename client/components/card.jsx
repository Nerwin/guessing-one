import { createContainer } from 'meteor/react-meteor-data';
import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Dom } from 'react-dom';

import Suggestion from '/client/components/suggestion';
import Question from '/client/components/question';
import Loading from '/client/components/loading';
import Victory from '/client/components/victory';
import Defeat from '/client/components/defeat';

class Card extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (typeof this.props.returnedComponent != 'undefined') {

      console.log("Card : ", this.props.returnedComponent);
      return <Defeat data={this.props.returnedComponent} />;

      // switch (this.props.returnedComponent.type) {
      //   case 'question':
      //     return <Question question={this.props.returnedComponent} />;
      //   case 'suggestion':
      //     return <Suggestion character={this.props.returnedComponent} />;
      //   case 'victory':
      //     return <Victory data={this.props.returnedComponent} />;
      //   case 'defeat':
      //     return <Defeat data={this.props.returnedComponent} />;
      //   default :
      //     return <Loading />;
      // }
    } else
    return <Loading />;
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

  return { returnedComponent: Session.get('returnedComponent') };
}, Card);
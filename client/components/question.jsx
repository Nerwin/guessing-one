import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Loading from '/client/components/loading';

export default class Question extends Component {

    constructor(props) {
        super(props);
        this.state = { roundNumber: 1 };
    }

    imgError(event) {
        event.target.src = "/images/defaultLevel.png";
    }

    render() {
        console.log("Question render");
        if (typeof this.props.question != "undefined") {

            let question = this.props.question

            let levelImg = (typeof this.props.level != 'undefined') ? "/images/" + this.props.level.img : "/images/defaultLevel.png";
            return (
                <div>
                    <p className="roundNumber-card text-left">Question {this.state.roundNumber}</p>
                    <img src={levelImg} className="img-card" onError={this.imgError}></img>
                    <p className="text-card text-center">{question.libelle}</p>
                </div>
            )
        } else {
            return (
                <Loading />
            )
        }
    }
}

Question.propTypes = {
    'question': React.PropTypes.any.isRequired,
    'question': React.PropTypes.object,
};




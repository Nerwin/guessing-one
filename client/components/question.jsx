import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Loading from '/client/components/loading';

export default class Question extends Component {

    constructor(props) {
        super(props);
        this.state = { roundNumber: 0 };
        this.handleGoBack = this.handleGoBack.bind(this);
        this.handleResponseOfAskedQuestion = this.handleResponseOfAskedQuestion.bind(this);
    }

    imgError(event) {
        event.target.src = "/images/characters/defaultLevel.png";
    }

    handleResponseOfAskedQuestion(event, instance) {
        event.preventDefault();
        Meteor.call('findNextStep', { responseId: event.currentTarget.id }, function (err, result) {
            Session.set("returnedComponent", result);
        });
    }

    handleGoBack(event, instance) {
        event.preventDefault();
        this.state.roundNumber = this.state.roundNumber - 2;
        if (this.state.roundNumber == 0)
            event.currentTarget.classList.add("invisible");

        Meteor.call('goBackToPreviousRound', function (err, result) {
            Session.set("returnedComponent", result);
        });
    }

    render() {
        if (typeof this.props.question != "undefined") {
            this.state.roundNumber += 1;
            let question = this.props.question
            if (this.state.roundNumber > 1)
                this.refs.goBackBtn.classList.remove("invisible");

            let levelImg = (typeof this.props.level != 'undefined') ? "/images/characters/" + this.props.level.img : "/images/characters/defaultLevel.png";
            return (
                <div className="card text-center">
                    <span className="roundNumber-card pull-left">Question {this.state.roundNumber}</span>
                    <button className="btn btn-info pull-right invisible" type="button" ref="goBackBtn" style={{ backgroundColor: "#8A0808" }} onClick={this.handleGoBack}><i className="fa fa-undo fa-2"> Correct</i></button>
                    <img src={levelImg} className="img-card text-center" onError={this.imgError}></img>
                    <p className="text-card text-justify">{question.libelle}</p>
                    <div className="group-button">
                        <button className="btn btn-block" type="button" style={{ backgroundColor: "#449D44", color: "#fff" }} id={Responses.yes} onClick={this.handleResponseOfAskedQuestion}>Yes</button>
                        <button className="btn btn-block" type="button" style={{ backgroundColor: "#698B47", color: "#fff" }} id={Responses.probably} onClick={this.handleResponseOfAskedQuestion}>Probably</button>
                        <button className="btn btn-block" type="button" style={{ backgroundColor: "#8F784A", color: "#fff" }} id={Responses.idk} onClick={this.handleResponseOfAskedQuestion}>I don't know</button>
                        <button className="btn btn-block" type="button" style={{ backgroundColor: "#B4664C", color: "#fff" }} id={Responses.probablynot} onClick={this.handleResponseOfAskedQuestion}>Probably not</button>
                        <button className="btn btn-block" type="button" style={{ backgroundColor: "#D9534F", color: "#fff" }} id={Responses.no} onClick={this.handleResponseOfAskedQuestion}>No</button>
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

Question.propTypes = {
    'question': React.PropTypes.any.isRequired,
    'question': React.PropTypes.object,
};




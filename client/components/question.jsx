import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Loading from '/client/components/loading';

export default class Question extends Component {

    constructor(props) {
        super(props);
        this.state = { roundNumber: 0 };
        this.handleGoBack = this.handleGoBack.bind(this);
    }

    imgError(event) {
        event.target.src = "/images/defaultLevel.png";
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

            let levelImg = (typeof this.props.level != 'undefined') ? "/images/" + this.props.level.img : "/images/defaultLevel.png";
            return (
                <div>
                    <span className="roundNumber-card pull-left">Question {this.state.roundNumber}</span>
                    <button className="btn btn-info pull-right invisible" type="button" ref="goBackBtn" style={{ backgroundColor: "#8A0808" }} onClick={this.handleGoBack}><i className="fa fa-undo fa-2"> Correct</i></button>
                    <img src={levelImg} className="img-card text-center" onError={this.imgError}></img>
                    <p className="text-card text-justify">{question.libelle}</p>
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




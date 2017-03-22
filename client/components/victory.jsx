import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Loading from '/client/components/loading';

export default class Victory extends Component {

    constructor(props) {
        super(props);
        this.handleYes = this.handleYes.bind(this);
    }

    handleYes(event, instance) {
        event.preventDefault();
        Meteor.call('initNewGame', function (err, result) {
            Session.set("returnedComponent", result);
        });
    }

    imgError(event) {
        event.target.src = "/images/characters/Inconnu.png";
    }

    render() {
        if (typeof this.props.data != 'undefined') {
            return (
                <div className="card text-center" style={{ width: "100%" }}>
                    <img src={"/images/characters/" + this.props.data.img} className="img-card" onError={this.imgError}></img>
                    <h2 className="name-card">{this.props.data.name}</h2>
                    <p>I won ! This character has been played {this.props.data.nbrTimesPlayed} times.</p>
                    <p>You wanna play again ?</p>
                    <div className="group-button">
                        <button className="btn btn-success btn-block" type="button" onClick={this.handleYes}>Yes</button>
                        <a className="btn btn-warning btn-block" href="/">No</a>
                    </div>
                </div>
            )
        } else {
            return <Loading />
        }
    }
}

Victory.propTypes = {
    'data': React.PropTypes.any.isRequired,
    'data': React.PropTypes.object,
};
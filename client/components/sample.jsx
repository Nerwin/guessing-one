import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Loading from '/client/components/loading';

export default class Defeat extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        console.log(this.props.data);
        if (typeof this.props.data != "undefined") {
            character = this.props.data;
            characterName = character.name;
            characterText = character.description;
            characterImg = "/images/characters/" + character.img;
            narratorImg = "/images/characters/level-2.png";
            narratorText = "Wouaw I can't find it, did you lied to me ?";
            bgColor = ColorArray[_.random(0, 4)];
        }

        if (typeof this.props.data != 'undefined') {
            return (
                <div className="ui-character">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="ui-item clearfix">
                                    <div className="ui-left">
                                        <img src={narratorImg} alt="" className="img-responsive" />
                                        <p>{narratorText}</p>
                                    </div>	
                                    <div className="ui-right" style={{backgroundColor: bgColor}}>
                                        <h3>{characterName}</h3>
                                        <img src={characterImg} alt="" className="img-responsive" />
                                        <p>{characterText}</p>
                                        <div className="group-button">
                                            <button className="btn btn-warning btn-block" type="button" id={Responses.yes} onClick={this.handleResponseOfSuggestedCharacter}>Yes</button>
                                            <button className="btn btn-warning btn-block" type="button" id={Responses.no} onClick={this.handleResponseOfSuggestedCharacter}>No</button>
                                        </div>	
                                    </div>	
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                );
        } else {
            return <Loading />
        }
    }
}

Defeat.propTypes = {
    'data': React.PropTypes.any.isRequired,
    'data': React.PropTypes.object,
};
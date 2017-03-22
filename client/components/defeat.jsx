import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Loading from '/client/components/loading';
import Suggest from '/client/components/suggest';
import Narrator from '/client/components/narrator';

export default class Defeat extends Component {

    constructor(props) {
        super(props);
        this.state = { step: "character", question: "", response: ResponsesDisplay[0]};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
        narrator = {};
    }

    componentWillMount() {
        if (typeof this.props.data != "undefined") {
            character = this.props.data;
            characterName = character.name;
            characterText = character.description;
            characterImg = "/images/characters/" + character.img;
            
            bgColor = ColorArray[_.random(0, 4)];

            narrator.img = "/images/characters/level-2.png";
            narrator.txt = "Wouaw I can't find it, did you lied to me ?";
        }

        Meteor.call('getCharactersName', function (err, result) {
            Session.set("listOfCharacters", result);
        });
    }

    handleInputChange(event)  {
        event.preventDefault();
        this.setState({ question: event.target.value });
    };

    handleSelectChange(event)  {
        event.preventDefault();
        this.setState({ response: event.target.value });
    };

    handleValidate(event, instance) {
        event.preventDefault();
        this.setState({ step: "question", name: this.refs.suggest.state.value});
    }
    
    render() {
        if (typeof this.props.data != 'undefined') {

            // $('#narratorText').bigtext({
            //     maxfontsize: 60 // default is 528 (in px)
            // });

            if (this.state.step == 'character') {
                return (
                    <div className="ui-character">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="ui-item clearfix">
                                        <div className="ui-left">
                                            <img src={narrator.img} className="img-responsive" />
                                            <p id="narratorText">{narrator.txt}</p>
                                        </div>	
                                        {/*<Narrator narrator={narrator} />*/}
                                        <div className="ui-right" style={{backgroundColor: bgColor}}>
                                            <h2>Please enter the name of your thinked character</h2>
                                            <p>Check into the character list or add a new one</p>
                                            <Suggest list={Session.get("listOfCharacters")} ref="suggest"/>
                                            <div className="group-button">
                                                <button className="btn btn-primary btn-block" type="button" onClick={this.handleValidate}>Validate</button>
                                            </div>	
                                        </div>	
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="ui-character">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="ui-item clearfix">
                                        <div className="ui-left">
                                            <img src={narrator.img} className="img-responsive" />
                                            <p id="narratorText">{narrator.txt}</p>
                                        </div>	
                                        {/*<Narrator narrator={narrator} />*/}
                                        <div className="ui-right" style={{backgroundColor: bgColor}}>
                                            <h2>Add a new character to the game</h2>
                                            <div className="form-group">
                                                <label htmlFor="question">Please suggest a question to identify this character</label>
                                                <input id="question" type="text" className="form-control input-lg" placeholder="Example : Is your character old ?" onChange={this.handleInputChange} value={this.state.question}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="response">Choose a response to your question above</label>
                                                <select className="form-control" id="response" defaultValue={this.state.response} onChange={this.handleSelectChange} >
                                                    <option value={Response.yes}>{ResponsesDisplay[0]}</option>
                                                    <option value={Response.no}>{ResponsesDisplay[4]}</option>
                                                </select>
                                            </div>
                                            <div className="group-button">
                                                <button className="btn btn-primary btn-block" type="button" onClick={this.handleValidate}>Validate</button>
                                            </div>
                                        </div>	
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        } else return <Loading />;
    }
}

Defeat.propTypes = {
    'data': React.PropTypes.any.isRequired,
    'data': React.PropTypes.object,
};
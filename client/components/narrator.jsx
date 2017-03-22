import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';

export default class Narrator extends Component {

    constructor(props) {
        super(props);

        narratorImg = "/images/characters/level-0.png";
        narratorText = "I'm a little bit lost";
    }

    componentWillMount() {
        if (typeof this.props.narrator != "undefined") {
            narratorImg = this.props.narrator.img;
            narratorText = this.props.narrator.txt;
        }
    }
    
    render() {
        // $('#narratorText').bigtext({
        //     maxfontsize: 60 // default is 528 (in px)
        // });
        return (
            <div className="ui-left">
                <img src={narratorImg} alt="" className="img-responsive" />
                <p id="narratorText">{narratorText}</p>
            </div>	
        );
    }
}

Narrator.propTypes = {
    'narrator': React.PropTypes.any.isRequired,
    'narrator': React.PropTypes.object,
};
import React, { PropTypes, Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Card from '/client/components/card.jsx';


class App extends Component {
    constructor(props) {
        super(props);
    }

    renderCard() {
        if (typeof this.props.character != "undefined") {
            let character = this.props.character;  
            return <Card key={character._id} character={character} />
        }
    }

    render() {
        return (
            <div>
                {this.renderCard()}
            </div>
        )
    }
}

export default createContainer(() => {
    return {
        character: Characters.findOne(),
    };
}, App);
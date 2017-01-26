import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Loading from '/client/components/loading';

export default class Defeat extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        if (typeof this.props.data != 'undefined') {
            return (
                <p>Fuck j'ai pas trouvé !</p>
            )
        } else {
            return <Loading />
        }
    }
}

Defeat.propTypes = {
    'data': React.PropTypes.any.isRequired,
    'data': React.PropTypes.object,
};
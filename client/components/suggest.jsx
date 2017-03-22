import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';
import Autosuggest from 'react-autosuggest';
import Levenshtein from 'fast-levenshtein';

var list = [];

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    if (typeof list === 'undefined') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    let resultList = list.filter(character => regex.test(character.name));

    var i = 1;
    return resultList.filter(function(char) {
        return i++ < 4;
    });
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span><img className="suggest-img img-responsive" src={"/images/characters/"+suggestion.img} onError={this.imgError}/> &nbsp; {suggestion.name}</span>
  );
}

export default class Suggest extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);

        this.state = { value: '', suggestions: [] };  

        if (this.props.list != 'undefined')
            list = this.props.list;
    }

    imgError(event) {
        event.target.src = "/images/characters/Inconnu.png";
    }

    onChange(event, { newValue })  {
        this.setState({ value: newValue });
    };

    onSuggestionsFetchRequested({ value }) {
        this.setState({ suggestions: getSuggestions(value) });
    };

    onSuggestionsClearRequested() {
        this.setState({ suggestions: [] });
    };

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Character name",
            value,
            onChange: this.onChange,
            id: "characterInput",
            className: "form-control input-lg"
        };

        if (this.props.list != 'undefined')
            list = this.props.list;

        return (
            <Autosuggest 
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps} />
        );
    }
}
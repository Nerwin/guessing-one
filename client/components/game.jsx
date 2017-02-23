import React, { Component, PropTypes } from 'react';
import { Dom } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Round from '/client/components/round';

export default class Game extends Component {

    constructor(props) {
        super(props);
    }

    showRounds() {
        $(document).ready(function () {
            $(".toggler").click(function (e) {
                e.preventDefault();
                
            });
        });
    }

    handleClick(event, instance) {
        event.preventDefault();
        $('.gameNum' + event.currentTarget.id).toggle();
    }

    renderRounds() {
        let rounds = this.props.game.rounds;
        let number = this.props.number;

        return rounds.map(function (round, index) {
            return <Round key={round.response._id} round={round} gameNumber={number} roundNumber={index} />
        });
    }


    render() {
        return (
        <div className="ui-game">
			<div className="panel-group" id="accordion">
			  <div className="panel">	
				 <div className="panel-heading">
					<h4 className="panel-title">
					  <a data-toggle="collapse" data-parent="#accordion" href={"#collapse"+(this.props.number + 1)}>
						<i className="fa fa-angle-right" style={{margin:"15px"}}></i> {this.props.game.createdAt + " - " + this.props.game.chosenCharacterName + " - " + (this.props.game.founded == true ? 'Found' : 'Not found')}
					  </a>
					</h4>
				 </div>
				 <div id={"collapse"+(this.props.number + 1)} className="panel-collapse collapse out">
					<div className="panel-body">
						<div className="table-responsive">
							<table className="table">
								<tbody>
                                    <tr className="rounds">
                                        <td className="col-header">Round</td>
                                        <td className="col-header">Question</td>
                                        <td className="col-header">Given answer</td>
                                        <td className="col-header">Wanted answer</td>
                                    </tr>
                                    {this.renderRounds()}
                                </tbody>
							</table>
						</div>
					</div>
				 </div>
			  </div>
            </div>
        </div>
        );
    }
};

Game.propTypes = {
    'game': React.PropTypes.any.isRequired,
    'game': React.PropTypes.object,
    'number': React.PropTypes.number,
};
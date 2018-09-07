import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import {RiverContainer, TurnContainer, FlopContainer} from './dealtCardsContainer';
import './TableCardsContainer.css';
import { flop, turn, river } from '../../../utils';

export default class TableCardsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			flop: false,
			turn: false,
			river: false,
		};
	}

	showFlop = () => {
		this.setState({
			flop: !this.state.flop
		});
	};

	showTurn = () => {
		this.setState({
			turn: !this.state.turn
		});
	};

	showRiver = () => {
		this.setState({
			river: !this.state.river
		});
	};

	render() {
		const wellStyles = { maxWidth: 400, minWidth: 200, margin: '0 auto 10px', float: 'left' };

		const buttonsInstance = (
			<div className="well" style={wellStyles}>
				<Button bsStyle="primary" bsSize="large" block onClick={this.showFlop}>
					{this.state.flop ? 'Hide the flop' : 'Show the flop'}
				</Button>
				<Button bsStyle="primary" bsSize="large" block onClick={this.showTurn}>
					{this.state.turn ? 'Hide the turn' : 'Show the turn'}
				</Button>
				<Button bsStyle="primary" bsSize="large" block onClick={this.showRiver}>
					{this.state.river ? 'Hide the river' : 'Show the river'}
				</Button>
			</div>
		);

		return (
			<div className='TableCardsContainer'>
				{buttonsInstance}
				{this.state.river ? <RiverContainer className='dealtCardsContainer' card={this.props.tableCards.river} /> : null}
				{this.state.turn ? <TurnContainer className='dealtCardsContainer' card={this.props.tableCards.turn} /> : null}
				{this.state.flop ? <FlopContainer className='dealtCardsContainer' cards={this.props.tableCards.flop} /> : null}
			</div>
		);
	}
}

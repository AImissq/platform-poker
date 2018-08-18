import React, { Component } from 'react';
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
	
	render() {
		return (
			<div className='TableCardsContainer'>
				{this.state.river ? <RiverContainer className='dealtCardsContainer' card={this.props.tableCards.river} /> : null}
				{this.state.turn ? <TurnContainer className='dealtCardsContainer' card={this.props.tableCards.turn} /> : null}
				{this.state.flop ? <FlopContainer className='dealtCardsContainer' cards={this.props.tableCards.flop} /> : null}
			</div>
		);
	}
}

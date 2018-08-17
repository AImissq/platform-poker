import React, { Component } from 'react';
import {RiverContainer, TurnContainer, FlopContainer} from './dealtCardsContainer';
import './TableCardsContainer.css';
import { flop, turn, river } from '../../../utils';

export default class TableCardsContainer extends Component {
	constructor() {
		super();
		this.state = {
			flop: false,
			turn: false,
			river: false,
		};
	}

	async getFlop() {
		const cards = await flop(this.props.deck);
		if(!this.state.flopCards) {
			this.setState({
				flopCards: cards
			});
			return cards;
		}
	}
	
	async getTurn() {
		const card = await turn(this.props.deck);
		if(!this.state.turnCard) {
			this.setState({
				turnCard: card
			});
			return card;
		}
	}
	
	async getRiver() {
		const card = await river(this.props.deck);
		if(!this.state.riverCard) {
			this.setState({
				riverCard: card
			});
			return card;
		}
	}
	
	render() {
		return (
			<div className='TableCardsContainer'>
				{this.state.river ? <RiverContainer className='dealtCardsContainer' card={river(this.props.deck)} /> : null}
				{this.state.turn ? <TurnContainer className='dealtCardsContainer' card={turn(this.props.deck)} /> : null}
				{this.state.flop ? <FlopContainer className='dealtCardsContainer' cards={flop(this.props.deck)} /> : null}
			</div>
		);
	}
}

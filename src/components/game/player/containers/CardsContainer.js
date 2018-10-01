import React, { Component } from 'react';
import './CardsContainer.css';
import Card from '../view/Card';

export class CardsContainer extends Component {
	render() {
		return (
			<div className="cards-container">
				{this.props.cards ? <Card value={this.props.cards[0].value} suit={this.props.cards[0].suit} /> : null}
				{this.props.cards ? <Card value={this.props.cards[1].value} suit={this.props.cards[1].suit} /> : null}
			</div>
		);
	}
}

export default CardsContainer;

import React, { Component } from 'react';
import DealtCard from './dealtCards/DealtCard';
import './dealtCardsContainer.css';

export default class FlopContainer extends Component {
	render() {
		return (
			<div className='dealtCardsContainer flop'>
				{this.props.cards ?
					<DealtCard
						card={this.props.cards[0]}
					/>
					: null
				}
				{this.props.cards ?
					<DealtCard
						card={this.props.cards[1]}
					/>
					: null
				}
				{this.props.cards ?
					<DealtCard
						card={this.props.cards[2]}
					/>
					: null
				}
			</div>
		);
	}
}

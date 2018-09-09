import React, { Component } from 'react';
import DealtCard from './dealtCards/DealtCard';
import './dealtCardsContainer.css';

export default class TurnContainer extends Component {
	render() {
		return (
			<div className='dealtCardsContainer turn'>
				{this.props.card ?
					<DealtCard
						card={this.props.card[0]}
					/>
					: null
				}
			</div>
		);
	}
}

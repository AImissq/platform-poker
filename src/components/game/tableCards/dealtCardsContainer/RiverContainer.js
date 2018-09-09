import React, { Component } from 'react';
import DealtCard from './dealtCards/DealtCard';
import './dealtCardsContainer.css';

export default class RiverContainer extends Component {
	render() {
		return (
			<div className='dealtCardsContainer river'>
				{this.props.card ?
					<DealtCard
						card={this.props.card[0]}
					/>
					: null}
			</div>
		);
	}
}

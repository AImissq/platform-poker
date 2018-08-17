import React, { Component } from 'react';
import DealtCard from './dealtCards/DealtCard';
import './dealtCardsContainer.css';

export default class TurnContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ready: true
		};
	}

	render() {
		return (
			<div className='dealtCardsContainer'>
				{this.state.ready ?
					<DealtCard
						card={this.props.card[0]}
					/>
					: null
				}
			</div>
		);
	}
}

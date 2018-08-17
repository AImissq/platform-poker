import React, { Component } from 'react';
import DealtCard from './dealtCards/DealtCard';
import './dealtCardsContainer.css';

export default class FlopContainer extends Component {
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
						card={this.props.cards[0]}
					/>
					: null
				}
				{this.state.ready ?
					<DealtCard
						card={this.props.cards[1]}
					/>
					: null
				}
				{this.state.ready ?
					<DealtCard
						card={this.props.cards[2]}
					/>
					: null
				}
			</div>
		);
	}
}

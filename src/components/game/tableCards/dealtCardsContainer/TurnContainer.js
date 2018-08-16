import React, { Component } from 'react';
import DealtCard from './dealtCards/DealtCard';

export default class TurnContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ready: true
		};
	}

	render() {
		const turn = (
			<div>
				<DealtCard
					card={{ value: 11, suit: 'diamonds', display: 'J' }}
				/>
			</div>
		);

		return (
			<div>
				{this.state.ready && turn}
			</div>
		);
	}
}

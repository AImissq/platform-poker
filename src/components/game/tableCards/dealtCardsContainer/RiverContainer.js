import React, { Component } from 'react';
import DealtCard from './dealtCards/DealtCard';

export default class RiverContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ready: true
		};
	}

	render() {
		const river = (
			<div>
				<DealtCard
					card={{ value: 10, suit: 'spades', display: '10' }}
				/>
			</div>
		);

		return (
			<div>
				{this.state.ready && river}
			</div>
		);
	}
}

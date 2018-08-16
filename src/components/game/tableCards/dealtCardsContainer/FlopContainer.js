import React, { Component } from 'react';
import DealtCard from './dealtCards/DealtCard';

export default class FlopContainer extends Component {
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
					card={{ value: 14, suit: 'hearts', display: 'A' }}
				/>
				<DealtCard
					card={{ value: 13, suit: 'hearts', display: 'K' }}
				/>
				<DealtCard
					card={{ value: 12, suit: 'hearts', display: 'Q' }}
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

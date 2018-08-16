import React, { Component } from 'react';
import {RiverContainer, TurnContainer, FlopContainer} from './dealtCardsContainer';

export default class TableCardsContainer extends Component {
	render() {
		return (
			<div>
				<RiverContainer />
				<TurnContainer />
				<FlopContainer />
			</div>
		);
	}
}

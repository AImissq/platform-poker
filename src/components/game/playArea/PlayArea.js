import React, { Component } from 'react';
import PlayerContainer from '../player/Container/PlayerContainer';
import TableCardsContainer from '../tableCards/TableCardsContainer';

export default class PlayArea extends Component {
	render() {
		return (
			<div>
				<PlayerContainer
					avatar={{}}
					name='Steve'
					playerNumber={3}
					type='me'
				/>
				<PlayerContainer
					avatar={{}}
					name='Joe'
					playerNumber={4}
					type='npc'
				/>
				<TableCardsContainer />
			</div>
		);
	}
}

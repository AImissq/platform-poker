import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './PlayerContainer.css';
import Avatar from '../Avatar/Avatar';
import Card from '../Card/Card';
import Text from '../Text/Text';
import Timer from '../Timer/Timer';

class PlayerContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cards: [
				{
					value: 'unknown',
					suit: 'unknown'
				},
				{
					value: 'unknown',
					suit: 'unknown'
				}
			],
			timer: 120
		};
	}


	render() {
		return (
			<div className='playerContainer' id=''>
				<Card
					value={this.state.cards[0].value}
					suit={this.state.cards[0].suit}
				/>
				<Card
					value={this.state.cards[1].value}
					suit={this.state.cards[1].suit}
				/>
				<Avatar
					features={this.props.avatar}
				/>
				<Text
					content={this.props.name}
					textStyle='h1'
				/>
				<Timer
					timer={this.state.timer}
				/>
			</div>
		);
	}
}

PlayerContainer.propTypes = {
	avatar: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	playerNumber: PropTypes.number.isRequired,
	type: PropTypes.string.isRequired
};

export default PlayerContainer;

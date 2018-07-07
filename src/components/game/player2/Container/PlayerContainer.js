import React, { Component } from 'react';
import './PlayerContainer.css';
import Avatar from '../Avatar/Avatar';
import Card from '../Card/Card';
import Text from '../Text/Text';
import Timer from '../Timer/Timer';

const features = {};

class PlayerContainer extends Component {
	render() {
		return (
		<div className='playerContainer' id=''>
			<Card
				value='unknown'
				suit='unknown'
			/>
			<Card
				value='unknown'
				suit='unknown'
			/>
			<Avatar
				features={features}
			/>
			<Text
				content='My Name'
				textStyle='h1'
			/>
			<Timer
				time='120'
			/>
		</div>
		);
	}
}

export default PlayerContainer;

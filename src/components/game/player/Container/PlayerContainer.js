import React, { Component } from 'react';
import './PlayerContainer.css';
import Avatar from '../Avatar/Avatar';
import Card from '../Card/Card';
import Text from '../Text/Text';

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
				textStyle='h2'
			/>
			<Text
				content='$25,000'
				textStyle='p'
			/>
			<Text
				content='Call'
				textStyle='p'
			/>
		</div>
		);
	}
}

export default PlayerContainer;

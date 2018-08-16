import React, { Component } from 'react';

export default class DealtCard extends Component {
	render() {
		const imageUrl = 'images/' + this.props.card.value + this.props.card.suit + '.png';
		return (
			<div>
				<img src={imageUrl} width='50px' />
			</div>
		);
	}
}

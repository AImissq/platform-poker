import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import './DealtCard.css';

export default class DealtCard extends Component {
	render() {
		const imageUrl = 'images/' + this.props.card.value + this.props.card.suit + '.png';
		return (
			<Image src={imageUrl} responsive className='DealtCard' />
		);
	}
}

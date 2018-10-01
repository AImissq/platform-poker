import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
	componentDidMount() {
		// console.log('props', this.props);
	}
	
	checkForPaint() {
		let display;
		if(this.props.value === 14) { display = 'A'; }
		else if(this.props.value === 13) { display = 'K'; }
		else if(this.props.value === 12) { display = 'Q'; }
		else if(this.props.value === 11) { display = 'J'; }
		else { display = this.props.value; }
		return display;
	}

	checkSuit() {
		let display;
		if(this.props.suit === 'hearts') { display = 'Hea'; }
		else if(this.props.suit === 'clubs') { display = 'Clu'; }
		else if(this.props.suit === 'diamonds') { display = 'Dia'; }
		else if(this.props.suit === 'spades') { display = 'Spa'; }
		return display;

	}

	render() {
		const value = this.checkForPaint();
		const suit = this.checkSuit();
		return (
			<div className='card'>
				<p>{value}</p>
				<p>{suit}</p>
			</div>
		);
	}
}

export default Card;

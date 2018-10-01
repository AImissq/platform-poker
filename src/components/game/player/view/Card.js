import React, { Component } from 'react';
import './Card.css';

class Card extends Component {

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
		if(this.props.suit === 'hearts') { display = 'H'; }
		else if(this.props.suit === 'clubs') { display = 'C'; }
		else if(this.props.suit === 'diamonds') { display = 'D'; }
		else if(this.props.suit === 'spades') { display = 'S'; }
		return display;

	}

	render() {
		const value = this.checkForPaint();
		const suit = this.checkSuit();
		return (
			<div className='card-demo'>
				<p className={`card-text ${suit === 'H' || suit === 'D' ? 'red' : 'black'}`}>{value}</p>
				<img className='suit-image' src={`images/${this.props.suit}.png`} alt={this.props.suit}/>
			</div>
		);
	}
}

export default Card;

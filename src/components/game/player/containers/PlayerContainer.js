import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PlayerContainer.css';
import CardsContainer from './CardsContainer';

export class PlayerContainer extends Component {
	addCommasToCash = cash => {
		let cashAsString = cash.toString();
		let cashArray = [];
		for (let i = cashAsString.length; i > 0; i = i - 3) {
			if(i === cashAsString.length) {
				cashArray.unshift(cashAsString.slice(-3));
			}
			else {
				cashArray.unshift(cashAsString.slice(i - cashAsString.length - 3, i - cashAsString.length));
			}
		}
		return '$' + cashArray.join(',');
	}

	render() {
		return (
			<div className="player-container">
				<div className="left-third">
					<div className='inner three'>
						<CardsContainer cards={this.props.player.hand.cards} />
					</div>
					<div className='inner one'>
						<img className='image-stopwatch' src='images/stopwatch.jpg' />
						<img className='image-stopwatch' src='images/stopwatch.jpg' />
						<img className='image-stopwatch' src='images/stopwatch.jpg' />
					</div>
				</div>
				<div className="center-third">
					<div className='inner three center-inner'>
						<img src={`images/${this.props.player.avatar}`} alt={this.props.player.name} className='avatar-image' />
					</div>
					<div className='inner one center-inner'>
						<p className='playerContainerRank'>12</p>
						<p className='playerContainerName'>{this.props.player.name}</p>
					</div>
				</div>
				<div className="right-third">
					<div className='inner two'>
						<p className='playerContainerTitle'>Your Hand</p>
						{!this.props.player.finalHand ? <p className='playerContainerText'>In Progress</p> : <p className='playerContainerText'>{this.props.player.finalHand.handTitle}</p>}
						{!this.props.player.finalHand && this.props.player.inThisHand ? <p className='playerContainerTitle'>Outs</p> : null}
						{!this.props.player.finalHand && this.props.player.inThisHand ? <p className='playerContainerText'>4</p> : null}
					</div>
					<div className='inner one'>
						<p className='playerContainerTitle'>Last Action</p>
						<p className='playerContainerText'>{this.props.player.lastAction}</p>
					</div>
					<div className='inner one'>
						<img className='image-chipstack' src='images/chipStack.jpg' />
						<p className='playerContainerCash'>{this.addCommasToCash(this.props.player.cash)}</p>
					</div>
				</div>
				<div className="footer">
					<div className='inner half'>
						<p className='playerContainerTimerText'>Timer</p>
					</div>
				</div>
			</div>
		);
	}
}

PlayerContainer.propTypes = {
	player: PropTypes.shape({
		cash: PropTypes.number,
		currentBet: PropTypes.number,
		currentRoundOfBetting: PropTypes.number,
		currentSingleBet: PropTypes.number,
		hand: PropTypes.object,
		inThisHand: PropTypes.bool,
		lastAction: PropTypes.string,
		name: PropTypes.string,
		playerNumber: PropTypes.number,
		type: PropTypes.string,
		whichPlayerAmI: PropTypes.string
	})
};

PlayerContainer.defaultProps = {
	player: {
		cash: 25000,
		currentBet: 0,
		currentRoundOfBetting: 0,
		currentSingleBet: 0,
		hand: {},
		inThisHand: true,
		lastAction: '',
		name: '',
		playerNumber: 0,
		type: 'npc',
		whichPlayerAmI: 'playerTopRight'
	}
};

export default PlayerContainer;

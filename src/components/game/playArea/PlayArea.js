import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import PlayerContainer from '../player/Container/PlayerContainer';
import TableCardsContainer from '../tableCards/TableCardsContainer';
import PlayerControlsContainer from '../playerControls/PlayerControlsContainer';
import { createDeck, deal } from '../../../utils';

import { dealTableCards } from '../../../actions/tableCardActions';
import { createPlayers, dealToPlayers } from '../../../actions/playersActions';

const players = {
	playerTopRight: {
		name: '0',
		playerNumber: 0,
		type: 'npc',
		hand: null,
		cash: 25000,
		lastAction: '',
		inThisHand: true
	},
	playerTopLeft: {
		name: '1',
		playerNumber: 1,
		type: 'npc',
		hand: null,
		cash: 25000,
		lastAction: '',
		inThisHand: true
	},
	playerCenter: {
		name: '2',
		playerNumber: 2,
		type: 'me',
		hand: null,
		cash: 25000,
		lastAction: '',
		inThisHand: true
	},
	playerBottomLeft: {
		name: '3',
		playerNumber: 3,
		type: 'npc',
		hand: null,
		cash: 25000,
		lastAction: '',
		inThisHand: true
	},
	playerBottomRight: null,
};

let deck;

export class PlayArea extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deck: [],
			playing: false,
			pot: 0,
			smallBlind: 10,
			bigBlind: 20,
			minRaise: 20,
			currentBet: 0,
			actionOnPlayer: 0
		};
	}

	componentWillMount() {
		deck = createDeck();
		this.props.dealTableCards(deck);
		this.props.createPlayers(players);
		this.setState({
			deck
		});
	}

	async dealCardsToPlayers(deck) {
		let tempState = {
			playerTopRight: false,
			playerTopLeft: false,
			playerCenter: false,
			playerBottomLeft: false,
			playerBottomRight: false
		};
		let numPlayers = 0;

		if(this.props.players.playerTopRight) { numPlayers++;}
		if(this.props.players.playerTopLeft) { numPlayers++;}
		if(this.props.players.playerCenter) { numPlayers++;}
		if(this.props.players.playerBottomLeft) { numPlayers++;}
		if(this.props.players.playerBottomRight) { numPlayers++;}

		const hands = await deal(deck, numPlayers);

		hands.map( hand => {
			if(this.props.players.playerTopRight && !tempState.playerTopRight) {
				this.props.dealToPlayers({
					playerTopRight: {
						...this.props.players.playerTopRight,
						hand
					}
				});
				tempState.playerTopRight = true;
			}
			else if(this.props.players.playerTopLeft && !tempState.playerTopLeft) {
				this.props.dealToPlayers({
					playerTopLeft: {
						...this.props.players.playerTopLeft,
						hand
					}
				});
				tempState.playerTopLeft = true;
			}
			else if(this.props.players.playerCenter && !tempState.playerCenter) {
				this.props.dealToPlayers({
					playerCenter: {
						...this.props.players.playerCenter,
						hand
					}
				});
				tempState.playerCenter = true;
			}
			else if(this.props.players.playerBottomLeft && !tempState.playerBottomLeft) {
				this.props.dealToPlayers({
					playerBottomLeft: {
						...this.props.players.playerBottomLeft,
						hand
					}
				});
				tempState.playerBottomLeft = true;
			}
			else if(this.props.players.playerBottomRight && !tempState.playerBottomRight) {
				this.props.dealToPlayers({
					playerBottomRight: {
						...this.props.players.playerBottomRight,
						hand
					}
				});
				tempState.playerBottomRight = true;
			}
			return null;
		});
		this.setState({
			playing: true
		});
	}

	goToNextPlayer = () => {
		let newActivePlayer = this.state.actionOnPlayer +1;
		if(newActivePlayer > 3) {
			newActivePlayer = 0;
		}
		this.setState({
			actionOnPlayer: newActivePlayer
		});
	}

	canThisPlayerBet = playerInfo => {
		console.log('checking if the player can bet: ', playerInfo.cash >= 0);
		return (playerInfo.playerNumber === this.state.actionOnPlayer && playerInfo.cash >= 0);
		// return playerInfo.cash >= 0 && playerInfo.lastAction !== 'Fold';
	}

	playerChecks = playerInfo => {
		console.log('CHECK for player: ', playerInfo);
		if(this.canThisPlayerBet(playerInfo)) {
			this.goToNextPlayer();
			// TODO: Update player's last action to 'Check' in redux
			this.goToNextPlayer();
		}
		else {
		}
	}

	playerCalls = playerInfo => {
		console.log('CALL for player: ', playerInfo);
		if(this.canThisPlayerBet(playerInfo)) {
			console.log('player can bet');
			if(playerInfo.cash >= this.state.currentBet) {
				console.log('first if statement is met');
				this.setState({
					pot: this.state.pot + this.state.currentBet
				});
				// TODO: Update player's cash in redux
				// TODO: Update player's last action to 'Call' in redux
			}
			else {
				console.log('else statement is met');
				this.setState({
					pot: this.state.pot + playerInfo.cash
				});
				// TODO: Reduce player's cash to zero
				// TODO: Update player's last action to 'Raise' in redux
			}
			this.goToNextPlayer();
		}
		else {
			console.log('player CANNOT bet');
		}
	}

	playerRaises = playerInfo => {
		console.log('RAISE for player: ', playerInfo);
		if(this.canThisPlayerBet(playerInfo)) {
			if(playerInfo.cash >= this.state.currentBet + this.state.minRaise) {
				this.setState({
					pot: this.state.pot + this.state.currentBet + this.state.minRaise,
					currentBet: this.state.currentBet + this.state.minRaise
				});
				// TODO: Update player's cash in redux
				// TODO: Update player's last action to 'Raise' in redux
			}
			else {
				this.setState({
					pot: this.state.pot + playerInfo.cash
				});
				// TODO: Reduce player's cash to zero
				// TODO: Update player's last action to 'Raise' in redux
			}
			this.goToNextPlayer();
		}
		else {
		}
	}

	resetPlayers = () => {
		this.setState({
			actionOnPlayer: 0,
			minRaise: this.state.bigBlind,
			currentBet: 0
		});
	}

	render() {
		return (
			<div>
				{this.props.players.playerTopRight ?
					<div style={{float: 'left'}}>
						<PlayerContainer
							cards={this.props.players.playerTopRight.hand}
							avatar={{}}
							name={this.props.players.playerTopRight.name}
							playerNumber={this.props.players.playerTopRight.playerNumber}
							type={this.props.players.playerTopRight.type}
						/>
						<PlayerControlsContainer 
							playerInfo={this.props.players.playerTopRight}
							checkAction = {this.playerChecks}
							callAction = {this.playerCalls}
							raiseAction = {this.playerRaises}
						/>
					</div>
					: null
				}
				{this.props.players.playerTopLeft ?
					<div style={{float: 'left'}}>
						<PlayerContainer
							cards={this.props.players.playerTopLeft.hand}
							avatar={{}}
							name={this.props.players.playerTopLeft.name}
							playerNumber={this.props.players.playerTopLeft.playerNumber}
							type={this.props.players.playerTopLeft.type}
						/>
						<PlayerControlsContainer 
							playerInfo={this.props.players.playerTopLeft}
							checkAction = {this.playerChecks}
							callAction = {this.playerCalls}
							raiseAction = {this.playerRaises}
						/>
					</div>
					: null
				}
				{this.props.players.playerBottomLeft ?
					<div style={{float: 'left'}}>
						<PlayerContainer
							cards={this.props.players.playerBottomLeft.hand}
							avatar={{}}
							name={this.props.players.playerBottomLeft.name}
							playerNumber={this.props.players.playerBottomLeft.playerNumber}
							type={this.props.players.playerBottomLeft.type}
						/>
						<PlayerControlsContainer 
							playerInfo={this.props.players.playerBottomLeft}
							checkAction = {this.playerChecks}
							callAction = {this.playerCalls}
							raiseAction = {this.playerRaises}
						/>
					</div>
					: null
				}
				{this.props.players.playerBottomRight ?
					<div style={{float: 'left'}}>
						<PlayerContainer
							cards={this.props.players.playerBottomRight.hand}
							avatar={{}}
							name={this.props.players.playerBottomRight.name}
							playerNumber={this.props.players.playerBottomRight.playerNumber}
							type={this.props.players.playerBottomRight.type}
						/>
						<PlayerControlsContainer 
							playerInfo={this.props.players.playerBottomRight}
							checkAction = {this.playerChecks}
							callAction = {this.playerCalls}
							raiseAction = {this.playerRaises}
						/>
					</div>
					: null
				}

				{ this.state.playing ? <TableCardsContainer
					deck={this.state.deck}
					tableCards={this.props.tableCards}
					resetPlayers={this.resetPlayers}
				/>
					: <div style={{width: '60%', margin: '0 auto'}}><Button bsStyle='primary' bsSize='large' block onClick={() => this.dealCardsToPlayers(deck)}>Start Game</Button></div>
				}

				<div style={{fontSize: '2em', width: '80%', margin: '0 auto', marginTop: '20px'}}>Pot: <strong>${this.state.pot}</strong> | Action is on player <strong>{this.state.actionOnPlayer}</strong></div>

				{this.props.players.playerCenter ?
					<div style={{float: 'left'}}>
						<PlayerContainer
							cards={this.props.players.playerCenter.hand}
							avatar={{}}
							name={this.props.players.playerCenter.name}
							playerNumber={this.props.players.playerCenter.playerNumber}
							type={this.props.players.playerCenter.type}
						/>
						<PlayerControlsContainer 
							playerInfo={this.props.players.playerCenter}
							checkAction = {this.playerChecks}
							callAction = {this.playerCalls}
							raiseAction = {this.playerRaises}
						/>
					</div>
					: null
				}
				
			</div>
		);
	}
}

PlayArea.propTypes = {
	dealTableCards: PropTypes.func.isRequired,
	tableCards: PropTypes.object.isRequired,
	dealToPlayers: PropTypes.func.isRequired,
	createPlayers: PropTypes.func.isRequired

};

PlayArea.defaultProps = {
	tableCards: {},
	players: {}
};

const mapStateToProps = state => ({
	tableCards: state.tableCards,
	players: state.players
});

export default connect(mapStateToProps, {dealTableCards, createPlayers, dealToPlayers})(PlayArea);

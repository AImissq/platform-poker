import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import PlayerContainer from '../player/Container/PlayerContainer';
import TableCardsContainer from '../tableCards/TableCardsContainer';
import PlayerControlsContainer from '../playerControls/PlayerControlsContainer';
import { createDeck, deal } from '../../../utils';

import { dealTableCards } from '../../../actions/tableCardActions';
import { createPlayers, dealToPlayers, updatePlayerCash, updatePlayerActionStats } from '../../../actions/playersActions';
import { addToPot } from '../../../actions/potActions';

const players = [
	{
		name: 'Steve',
		playerNumber: 0,
		type: 'npc',
		hand: null,
		cash: 25000,
		lastAction: '',
		inThisHand: true,
		whichPlayerAmI: 'playerTopRight',
		currentSingleBet: 0,
		currentRoundOfBetting: 0,
		currentBet: 0
	},
	{
		name: 'Kacy',
		playerNumber: 1,
		type: 'npc',
		hand: null,
		cash: 25000,
		lastAction: '',
		inThisHand: true,
		whichPlayerAmI: 'playerTopLeft',
		currentSingleBet: 0,
		currentRoundOfBetting: 0,
		currentBet: 0
	},
	{
		name: 'Ben',
		playerNumber: 2,
		type: 'npc',
		hand: null,
		cash: 25000,
		lastAction: '',
		inThisHand: true,
		whichPlayerAmI: 'playerCenter',
		currentSingleBet: 0,
		currentRoundOfBetting: 0,
		currentBet: 0
	}
];

let deck;

export class PlayArea extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deck: [],
			playing: false,
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
		const hands = await deal(deck, this.props.players.length);

		this.props.dealToPlayers(this.props.players, hands);

		this.setState({
			playing: true
		});
	}

	goToNextPlayer = () => {
		let newActivePlayer = this.state.actionOnPlayer +1;
		if(newActivePlayer >= this.props.players.length) {
			newActivePlayer = 0;
		}
		for (let i = 0; i < this.props.players.length; i++) {
			if(this.props.players[i].playerNumber === newActivePlayer && this.props.players[i].lastAction !== '' && this.props.players[i].currentBet === this.state.currentBet) {
				alert('Time to see more cards!');
			}
			
		}
		this.setState({
			actionOnPlayer: newActivePlayer
		});
	}

	canThisPlayerBet = playerInfo => {
		// console.log('checking if the player can bet: ', playerInfo.cash >= 0);
		return (playerInfo.playerNumber === this.state.actionOnPlayer && playerInfo.cash >= 0);
		// return playerInfo.cash >= 0 && playerInfo.lastAction !== 'Fold';
	}

	playerChecks = playerInfo => {
		// console.log('CHECK for player: ', playerInfo);
		if(this.canThisPlayerBet(playerInfo)) {
			this.props.addToPot(
				// whoAmI, amountToAdd, potInfo
				playerInfo.whichPlayerAmI, 0, this.props.pot
			);
			this.props.updatePlayerActionStats(
				// players, whoAmI, action, currentBet
				this.props.players, playerInfo.whichPlayerAmI, 'Check', 0
			)
			this.goToNextPlayer();
			// TODO: Update player's last action to 'Check' in redux
		}
		else {
		}
	}

	playerCalls = playerInfo => {
		// console.log('CALL for player: ', playerInfo);
		if(this.canThisPlayerBet(playerInfo)) {
			// console.log('player can bet');
			if(playerInfo.cash >= this.state.currentBet) {
				// console.log('first if statement is met');

				this.props.addToPot(
					// whoAmI, amountToAdd, potInfo
					playerInfo.whichPlayerAmI, this.state.currentBet - playerInfo.currentBet, this.props.pot
				);
				// TODO: Update player's cash in redux
				this.props.updatePlayerCash(
					// players, whoAmI, amountToChange
					this.props.players, playerInfo.whichPlayerAmI, (this.state.currentBet - playerInfo.currentBet) * -1
				)
				// TODO: Update player's last action to 'Call' in redux
				this.props.updatePlayerActionStats(
					// players, whoAmI, action, currentBet
					this.props.players, playerInfo.whichPlayerAmI, 'Call', this.state.currentBet
				);
			}
			else {
				// console.log('else statement is met');
				this.setState({
					pot: this.state.pot + playerInfo.cash
				});
				// TODO: Reduce player's cash to zero
				// TODO: Update player's last action to 'Raise' in redux
			}
			this.goToNextPlayer();
		}
		else {
			// console.log('player CANNOT bet');
		}
	}

	playerRaises = playerInfo => {
		// console.log('RAISE for player: ', playerInfo);
		if(this.canThisPlayerBet(playerInfo)) {
			if(playerInfo.cash >= this.state.currentBet + this.state.minRaise) {
				this.props.addToPot(
					// whoAmI, amountToAdd, potInfo
					playerInfo.whichPlayerAmI, this.state.currentBet + this.state.minRaise, this.props.pot
				);
				this.setState({
					currentBet: this.state.currentBet + this.state.minRaise
				});
				// TODO: Update player's cash in redux
				this.props.updatePlayerCash(
					this.props.players, playerInfo.whichPlayerAmI, (this.state.currentBet + this.state.minRaise) * -1
				)
				// TODO: Update player's last action to 'Raise' in redux
				this.props.updatePlayerActionStats(
					// players, whoAmI, action, currentBet
					this.props.players, playerInfo.whichPlayerAmI, 'Raise', this.state.currentBet + this.state.minRaise
				);
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

	drawOpponentDivs = () => {
		const opponentDivs = this.props.players.map(player => {
			return (<div style={{float: 'left'}} className='hello' key={player.playerNumber}>
				<PlayerContainer
					cards={player.hand}
					avatar={{}}
					name={player.name}
					playerNumber={player.playerNumber}
					type={player.type}
					cash={player.cash}
					lastAction={player.lastAction}
				/>
				<PlayerControlsContainer 
					playerInfo={player}
					checkAction = {this.playerChecks}
					callAction = {this.playerCalls}
					raiseAction = {this.playerRaises}
				/>
			</div>)
		});
		return opponentDivs;
	}

	render() {
		return (
			<div>
				{this.drawOpponentDivs()}

				{ this.state.playing ? <TableCardsContainer
					deck={this.state.deck}
					tableCards={this.props.tableCards}
					resetPlayers={this.resetPlayers}
				/>
					: <div style={{width: '60%', margin: '0 auto'}}><Button bsStyle='primary' bsSize='large' block onClick={() => this.dealCardsToPlayers(deck)}>Start Game</Button></div>
				}

				<div style={{fontSize: '2em', width: '800px', margin: '0 auto', marginTop: '20px'}}>
					Pot: <strong>${this.props.pot[0].total}</strong>
					{this.props.players[0]
						? <span> | Action is on <strong>{this.props.players[this.state.actionOnPlayer].name}</strong> (player <strong>{this.state.actionOnPlayer}</strong>)</span>
						: null
					}
				</div>

				{this.props.players.playerCenter ?
					<div style={{float: 'left'}}>
						<PlayerContainer
							cards={this.props.players.playerCenter.hand}
							avatar={{}}
							name={this.props.players.playerCenter.name}
							playerNumber={this.props.players.playerCenter.playerNumber}
							type={this.props.players.playerCenter.type}
							cash={this.props.players.playerCenter.cash}
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
	createPlayers: PropTypes.func.isRequired,
	addToPot: PropTypes.func.isRequired,
	updatePlayerCash: PropTypes.func.isRequired,
	updatePlayerActionStats: PropTypes.func.isRequired,
	players: PropTypes.array,
	pot: PropTypes.array
};

PlayArea.defaultProps = {
	tableCards: {},
	players: [],
	pot: [
		{
			total: 0,
			players: [],
			full: false
		}
	]
};

const mapStateToProps = state => ({
	tableCards: state.tableCards,
	players: state.players,
	pot: state.pot
});

export default connect(mapStateToProps, {dealTableCards, createPlayers, dealToPlayers, addToPot, updatePlayerCash, updatePlayerActionStats})(PlayArea);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import PlayerContainer from '../player/containers/PlayerContainer';
import TableCardsContainer from '../tableCards/TableCardsContainer';
import PlayerControlsContainer from '../playerControls/PlayerControlsContainer';
import './PlayArea.css';

import { createDeck, deal, determineHand } from '../../../utils';
import { dealTableCards } from '../../../actions/tableCardActions';
import { showFlopCards, showTurnCard, showRiverCard } from '../../../actions/tableCardStatusActions';
import { 
	createPlayers,
	dealToPlayers,
	updatePlayerCash,
	updatePlayerActionStats,
	resetPlayerCurrentBets,
	addDeterminedHandsToPlayers
} from '../../../actions/playersActions';
import { addToPot } from '../../../actions/potActions';

const players = [
	{
		name: 'Steve',
		playerNumber: 0,
		type: 'npc',
		hand: {
			cards: null
		},
		cash: 25000,
		lastAction: '',
		inThisHand: true,
		whichPlayerAmI: 'playerTopRight',
		currentSingleBet: 0,
		currentRoundOfBetting: 0,
		currentBet: 0,
		avatar: 'avatar1.png'
	},
	{
		name: 'Ben',
		playerNumber: 1,
		type: 'npc',
		hand: {
			cards: null
		},
		cash: 25000,
		lastAction: '',
		inThisHand: true,
		whichPlayerAmI: 'playerTopLeft',
		currentSingleBet: 0,
		currentRoundOfBetting: 0,
		currentBet: 0,
		avatar: 'avatar2.png'
	},
	{
		name: 'Kacy',
		playerNumber: 2,
		type: 'npc',
		hand: {
			cards: null
		},
		cash: 25000,
		lastAction: '',
		inThisHand: true,
		whichPlayerAmI: 'playerCenter',
		currentSingleBet: 0,
		currentRoundOfBetting: 0,
		currentBet: 0,
		avatar: 'avatar3.png'
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
			actionOnPlayer: 0,
			gameOver: false,
			results: [
				{
					name: players[0].name,
					results: null
				},
				{
					name: players[1].name,
					results: null
				},
				{
					name: players[2].name,
					results: null
				}
			]
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

	componentDidUpdate(prevProps, prevState, snapshot) {
		this.checkIfBettingRoundIsOver();
	}

	async dealCardsToPlayers(deck) {
		const hands = await deal(deck, this.props.players.details.length);

		this.props.dealToPlayers(this.props.players.details, hands);

		this.setState({
			playing: true
		});
	}

	checkIfBettingRoundIsOver = () => {
		for (let i = 0; i < this.props.players.details.length; i++) {
			if(this.props.players.details[i].playerNumber === this.state.actionOnPlayer && this.props.players.details[i].lastAction !== '' && this.props.players.details[i].currentBet === this.state.currentBet) {
				if(!this.props.tableCardStatus.flopIsVisible) {
					this.props.showFlopCards();
					this.resetPlayers();
				}
				else if(this.props.tableCardStatus.flopIsVisible && !this.props.tableCardStatus.turnIsVisible) {
					this.props.showTurnCard();
					this.resetPlayers();
				}
				else if(this.props.tableCardStatus.flopIsVisible && this.props.tableCardStatus.turnIsVisible && !this.props.tableCardStatus.riverIsVisible) {
					this.props.showRiverCard();
					this.resetPlayers();
				}
				else if(this.props.tableCardStatus.flopIsVisible && this.props.tableCardStatus.turnIsVisible && this.props.tableCardStatus.riverIsVisible && !this.state.gameOver) {
					this.setState({
						gameOver: true
					});
					const allHands = this.determinePlayersHands(this.props.players.details);
					setTimeout(() => {
						this.props.addDeterminedHandsToPlayers(this.props.players.details, allHands)
					}, 3000);
				}
			}
		}
	}

	determinePlayersHands = players => {
		const allHands = players.map( player => {
			if(player.inThisHand){
				const cardPool = {
					cards: [...this.props.tableCards.flop, ...this.props.tableCards.turn, ...this.props.tableCards.river, ...player.hand.cards]
				};
				return determineHand(cardPool);
			}
			else return null;
		});
		return allHands;
	}

	goToNextPlayer = (newActivePlayer = this.state.actionOnPlayer + 1) => {
		if(newActivePlayer >= this.props.players.details.length) {
			newActivePlayer = 0;
		}

		for (let i = 0; i < this.props.players.details.length; i++) {
			if(!this.props.players.details[newActivePlayer].inThisHand) {
				newActivePlayer++
				if(newActivePlayer >= this.props.players.details.length) {
					newActivePlayer = 0;
				}
			}			
		}

		this.setState({
			actionOnPlayer: newActivePlayer
		});
	}

	canThisPlayerBet = playerInfo => {
		return (playerInfo.inThisHand && playerInfo.playerNumber === this.state.actionOnPlayer && playerInfo.cash >= 0);
	}

	playerChecks = playerInfo => {
		if(this.canThisPlayerBet(playerInfo)) {
			this.props.addToPot(
				// whoAmI, amountToAdd, potInfo
				playerInfo.whichPlayerAmI, 0, this.props.pot.details
			);
			this.props.updatePlayerActionStats(
				// players, whoAmI, action, currentBet
				this.props.players.details, playerInfo.whichPlayerAmI, 'Check', 0
			)
			this.goToNextPlayer();
		}
	}

	playerCalls = playerInfo => {
		if(this.canThisPlayerBet(playerInfo)) {
			if(playerInfo.cash >= this.state.currentBet) {

				this.props.addToPot(
					// whoAmI, amountToAdd, potInfo
					playerInfo.whichPlayerAmI, this.state.currentBet - playerInfo.currentBet, this.props.pot.details
				);
				this.props.updatePlayerCash(
					// players, whoAmI, amountToChange
					this.props.players.details, playerInfo.whichPlayerAmI, (this.state.currentBet - playerInfo.currentBet) * -1
				)
				this.props.updatePlayerActionStats(
					// players, whoAmI, action, currentBet
					this.props.players.details, playerInfo.whichPlayerAmI, 'Call', this.state.currentBet
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
			// player cannot bet
		}
	}

	playerRaises = playerInfo => {
		if(this.canThisPlayerBet(playerInfo)) {
			const newBet = this.state.currentBet + this.state.minRaise;
			if(playerInfo.cash >= newBet) {
				this.props.addToPot(
					// whoAmI, amountToAdd, potInfo
					playerInfo.whichPlayerAmI, newBet - playerInfo.currentBet, this.props.pot.details
				);
				this.props.updatePlayerCash(
					this.props.players.details, playerInfo.whichPlayerAmI, (newBet - playerInfo.currentBet) * -1
				)
				this.props.updatePlayerActionStats(
					// players, whoAmI, action, currentBet
					this.props.players.details, playerInfo.whichPlayerAmI, 'Raise', newBet
				);
				this.setState({
					currentBet: newBet
				});
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

	playerFolds = playerInfo => {
		if(this.canThisPlayerBet(playerInfo)) {
			this.props.updatePlayerActionStats(
				// players, whoAmI, action, currentBet
				this.props.players.details, playerInfo.whichPlayerAmI, 'Fold', 0
			)
			this.goToNextPlayer();
		}
	}

	resetPlayers = () => {
		this.setState({
			actionOnPlayer: 0,
			minRaise: this.state.bigBlind,
			currentBet: 0
		});
		this.props.resetPlayerCurrentBets(this.props.players.details);
		if(!this.props.players.details[0].inThisHand) {
			this.goToNextPlayer(0);
		}
	}

	drawOpponentDivs = () => {
		let checkOrCall = 'check';
		for (let j = 0; j < this.props.players.details.length; j++) {
			if(this.props.players.details[j].lastAction === 'Call' || this.props.players.details[j].lastAction === 'Raise') {
				checkOrCall = 'call';
				j = this.props.players.details.length;
			}
		}

		const opponentDivs = this.props.players.details.map(player => {
			return (<div style={{float: 'left'}} className='hello' key={player.playerNumber}>
				<PlayerContainer player={player} />
				{this.state.playing && !this.state.gameOver && this.state.actionOnPlayer === player.playerNumber ?
					(<PlayerControlsContainer 
						playerInfo={player}
						checkOrCall={checkOrCall}
						checkAction = {this.playerChecks}
						callAction = {this.playerCalls}
						raiseAction = {this.playerRaises}
						foldAction = {this.playerFolds}
					/>
				) : (<div style={{float: 'left', width: 125, minWidth: '125px', margin: '0 auto 10px'}}> </div>)}
			</div>)
		});
		return opponentDivs;
	}

	render() {
		return (
			<div className='play-area'>
				{this.drawOpponentDivs()}

				<div style={{fontSize: '2em', width: '800px', margin: '0 auto', marginBottom: '20px'}}>
					Pot: <strong>${this.props.pot.details[0].total}</strong>
					{this.props.players.details[0]
						? <span> | Action is on <strong>{this.props.players.details[this.state.actionOnPlayer].name}</strong> (player <strong>{this.state.actionOnPlayer}</strong>)</span>
						: null
					}
				</div>

				{ this.state.playing ? <TableCardsContainer
					deck={this.state.deck}
					tableCards={this.props.tableCards}
					resetPlayers={this.resetPlayers}
				/>
					: <div style={{width: '60%', margin: '0 auto', display: 'table'}}><Button bsStyle='primary' bsSize='large' block onClick={() => this.dealCardsToPlayers(deck)}>Start Game</Button></div>
				}

			</div>
		);
	}
}

PlayArea.propTypes = {
	dealTableCards: PropTypes.func.isRequired,
	dealToPlayers: PropTypes.func.isRequired,
	createPlayers: PropTypes.func.isRequired,
	addToPot: PropTypes.func.isRequired,
	updatePlayerCash: PropTypes.func.isRequired,
	updatePlayerActionStats: PropTypes.func.isRequired,
	resetPlayerCurrentBets: PropTypes.func.isRequired,
	showFlopCards: PropTypes.func.isRequired,
	showTurnCard: PropTypes.func.isRequired,
	showRiverCard: PropTypes.func.isRequired,
	addDeterminedHandsToPlayers: PropTypes.func.isRequired,

	tableCardStatus: PropTypes.object,
	tableCards: PropTypes.object,
	players: PropTypes.object,
	pot: PropTypes.object
};

PlayArea.defaultProps = {
	tableCardStatus: {},
	tableCards: {},
	players: {
		loading: false,
		details: []
	},
	pot: {
		loading: false,
		details: [{
			total: 0,
			players: [],
			full: false
		}]
	}
};

const mapStateToProps = state => ({
	tableCardStatus: state.tableCardStatus,
	tableCards: state.tableCards,
	players: state.players,
	pot: state.pot
});

export default connect(mapStateToProps, {
	dealTableCards,
	createPlayers,
	dealToPlayers,
	addToPot,
	updatePlayerCash,
	updatePlayerActionStats,
	resetPlayerCurrentBets,
	showFlopCards,
	showTurnCard,
	showRiverCard,
	addDeterminedHandsToPlayers
})(PlayArea);

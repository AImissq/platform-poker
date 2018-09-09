import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PlayerContainer from '../player/Container/PlayerContainer';
import TableCardsContainer from '../tableCards/TableCardsContainer';
import { createDeck, deal } from '../../../utils';

import {
	dealTableCards,
	showFlopCards,
	showTurnCard,
	showRiverCard
} from '../../../actions/tableCardActions';

export class PlayArea extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playerTopRight: {
				name: 'Joe',
				playerNumber: 0,
				type: 'npc',
				hand: null
			},
			playerTopLeft: {
				name: 'Sam',
				playerNumber: 1,
				type: 'npc',
				hand: null
			},
			playerCenter: {
				name: 'Steve',
				playerNumber: 2,
				type: 'me',
				hand: null
			},
			playerBottomLeft: {
				name: 'Tiffany',
				playerNumber: 3,
				type: 'npc',
				hand: null
			},
			playerBottomRight: null,
			deck: []
		};
	}

	componentWillMount() {
		const deck = createDeck();
		this.props.dealTableCards(deck);
		this.dealToPlayers(deck);
		this.setState({
			deck
		});
	}

	async dealToPlayers(deck) {
		let tempState = {};
		let numPlayers = 0;
		if(this.state.playerTopRight) { numPlayers++;}
		if(this.state.playerTopLeft) { numPlayers++;}
		if(this.state.playerCenter) { numPlayers++;}
		if(this.state.playerBottomLeft) { numPlayers++;}
		if(this.state.playerBottomRight) { numPlayers++;}

		const hands = await deal(deck, numPlayers);

		hands.map( (hand) => {
			if(this.state.playerTopRight && !tempState.playerTopRight) {
				tempState = {
					...tempState,
					playerTopRight: { 
						...this.state.playerTopRight,
						hand
					}
				};
			}
			else if(this.state.playerTopLeft && !tempState.playerTopLeft) {
				tempState = {
					...tempState,
					playerTopLeft: {
						...this.state.playerTopLeft,
						hand
					}
				};
			}
			else if(this.state.playerCenter && !tempState.playerCenter) {
				tempState = {
					...tempState,
					playerCenter: {
						...this.state.playerCenter,
						hand
					}
				};
			}
			else if(this.state.playerBottomLeft && !tempState.playerBottomLeft) {
				tempState = {
					...tempState,
					playerBottomLeft: {
						...this.state.playerBottomLeft,
						hand
					}
				};
			}
			else if(this.state.playerBottomRight && !tempState.playerBottomRight) {
				tempState = {
					...tempState,
					playerBottomRight: {
						...this.state.playerBottomRight,
						hand
					}
				};
			}
			return tempState;
		});

		this.setState({
			...this.state,
			...tempState,
			deck
		});
	}

	render() {
		return (
			<div>
				{this.state.playerTopRight ?
					<PlayerContainer
						cards={this.state.playerTopRight.hand}
						avatar={{}}
						name={this.state.playerTopRight.name}
						playerNumber={this.state.playerTopRight.playerNumber}
						type={this.state.playerTopRight.type}
					/>
					: null
				}
				{this.state.playerTopLeft ?
					<PlayerContainer
						cards={this.state.playerTopLeft.hand}
						avatar={{}}
						name={this.state.playerTopLeft.name}
						playerNumber={this.state.playerTopLeft.playerNumber}
						type={this.state.playerTopLeft.type}
					/>
					: null
				}
				{this.state.playerBottomLeft ?
					<PlayerContainer
						cards={this.state.playerBottomLeft.hand}
						avatar={{}}
						name={this.state.playerBottomLeft.name}
						playerNumber={this.state.playerBottomLeft.playerNumber}
						type={this.state.playerBottomLeft.type}
					/>
					: null
				}
				{this.state.playerBottomRight ?
					<PlayerContainer
						cards={this.state.playerBottomRight.hand}
						avatar={{}}
						name={this.state.playerBottomRight.name}
						playerNumber={this.state.playerBottomRight.playerNumber}
						type={this.state.playerBottomRight.type}
					/>
					: null
				}
				<TableCardsContainer
					deck={this.state.deck}
					tableCards={this.props.tableCards}
				/>
				{this.state.playerCenter ?
					<PlayerContainer
						cards={this.state.playerCenter.hand}
						avatar={{}}
						name={this.state.playerCenter.name}
						playerNumber={this.state.playerCenter.playerNumber}
						type={this.state.playerCenter.type}
					/>
					: null
				}
			</div>
		);
	}
}

PlayArea.propTypes = {
	dealTableCards: PropTypes.func.isRequired,
	tableCards: PropTypes.object.isRequired
};

PlayArea.defaultProps = {
	tableCards: {}
};

const mapStateToProps = state => ({
	tableCards: state.tableCards.tableCards
});

export default connect(mapStateToProps, {dealTableCards})(PlayArea);

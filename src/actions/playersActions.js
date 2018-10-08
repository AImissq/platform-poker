import {
	RESET_PLAYERS_TO_DEFAULT,
	CREATE_PLAYERS,
	DEAL_CARDS_TO_PLAYER,
	UPDATE_PLAYER_CASH,
	UPDATE_PLAYER_ACTION_STATS,
	ADD_DETERMINED_HANDS_TO_PLAYERS,
	AWARD_POT_TO_PLAYER,
	RESET_PLAYER_CURRENT_BETS,
	RESET_PLAYERS_FOR_NEW_HAND
} from './types';

export const resetPlayersToDefault = () => dispatch => {
	dispatch({
		type: RESET_PLAYERS_TO_DEFAULT,
		payload: {
			loading: false,
			details: []
		}
	});
};

export const resetPlayersForNewHand = players => dispatch => {
	players.map(player => (
		player = {
			...player,
			hand: {
				cards: []
			},
			lastAction: '',
			inThisHand: true,
			currentBet: 0,
			finalHand: null
		}
	));
	dispatch({
		type: RESET_PLAYERS_FOR_NEW_HAND,
		payload: {
			loading: false,
			details: [...players]
		}
	});
};

export const createPlayers = playerData => dispatch => {
	dispatch({
		type: CREATE_PLAYERS,
		payload: {
			loading: false,
			details: [...playerData]
		}
	});
};

export const dealToPlayers = (players, hands) => dispatch => {
	for (let i = 0; i < players.length; i++) {
		players[i].hand.cards = hands[i];
	}

	dispatch({
		type: DEAL_CARDS_TO_PLAYER,
		payload: {
			loading: false,
			details: [...players]
		}
	});
};

export const updatePlayerCash = (players, whoAmI, amountToChange) => dispatch => {
	for (let i = 0; i < players.length; i++) {
		if(players[i].whichPlayerAmI === whoAmI) {
			players[i].cash += amountToChange;
		}
	}

	dispatch({
		type: UPDATE_PLAYER_CASH,
		payload: {
			loading: false,
			details: [...players]
		}
	});
};

export const updatePlayerActionStats = (players, whoAmI, action, currentBet) => dispatch => {
	for (let i = 0; i < players.length; i++) {
		if(players[i].whichPlayerAmI === whoAmI) {
			players[i].lastAction = action;
			players[i].currentBet = currentBet;
			if(action === 'Fold') {
				players[i].inThisHand = false;
			}
		}
	}

	dispatch({
		type: UPDATE_PLAYER_ACTION_STATS,
		payload: {
			loading: false,
			details: [...players]
		}
	});
};

export const addDeterminedHandsToPlayers = (players, hands) => dispatch => {
	for (let i = 0; i < players.length; i++) {
		players[i].finalHand = hands[i];
	}

	dispatch({
		type: ADD_DETERMINED_HANDS_TO_PLAYERS,
		payload: {
			loading: false,
			details: [...players]
		}
	});
};

export const awardPotToPlayer = (players, winners, pot) => dispatch => {
	for (let i = 0; i < winners.length; i++) {
		players[winners[i].playerNumber].cash = players[winners[i].playerNumber].cash + (pot / winners.length);
	}

	dispatch({
		type: AWARD_POT_TO_PLAYER,
		payload: {
			loading: false,
			details: [...players]
		}
	})
}

export const resetPlayerCurrentBets = players => dispatch => {
	for (let i = 0; i < players.length; i++) {
		if(players[i].inThisHand){
			players[i] = {
				...players[i],
				currentBet: 0,
				lastAction: ''
			};
		}
	}
	dispatch({
		type: RESET_PLAYER_CURRENT_BETS,
		payload: {
			loading: false,
			details: [...players]
		}
	});
};

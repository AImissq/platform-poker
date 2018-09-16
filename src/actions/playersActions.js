import { CREATE_PLAYERS, DEAL_CARDS_TO_PLAYER, UPDATE_PLAYER_CASH } from './types';

export const createPlayers = playerData => dispatch => {
	dispatch({
		type: CREATE_PLAYERS,
		payload: [...playerData]
	});
};

export const dealToPlayers = (players, hands) => dispatch => {
	for (let i = 0; i < players.length; i++) {
		players[i].hand = hands[i];
	}

	dispatch({
		type: DEAL_CARDS_TO_PLAYER,
		payload: [...players]
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
		payload: [...players]
	});
};





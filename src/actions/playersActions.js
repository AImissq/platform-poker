import { CREATE_PLAYERS, DEAL_CARDS_TO_PLAYER, UPDATE_PLAYER_CASH } from './types';

export const createPlayers = playerData => dispatch => {
	dispatch({
		type: CREATE_PLAYERS,
		payload: {...playerData}
	});
};

export const dealToPlayers = handData => dispatch => {
	console.log('handData: ', handData);
	dispatch({
		type: DEAL_CARDS_TO_PLAYER,
		payload: {...handData}
	});
};

export const updatePlayerCash = (playerInfo, amountToChange) => dispatch => {
	playerInfo.cash = playerInfo.cash + amountToChange;
	dispatch({
		type: UPDATE_PLAYER_CASH,
		payload: {[playerInfo.whichPlayerAmI]: {...playerInfo}}
	});
};

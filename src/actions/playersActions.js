import { CREATE_PLAYERS, DEAL_CARDS_TO_PLAYER } from './types';

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


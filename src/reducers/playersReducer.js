import {
	CREATE_PLAYERS,
	DEAL_CARDS_TO_PLAYER,
	UPDATE_PLAYER_CASH,
	UPDATE_PLAYER_ACTION_STATS
} from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
	switch(action.type) {
	case CREATE_PLAYERS:
		return [...action.payload];
	case DEAL_CARDS_TO_PLAYER:
		return [...action.payload];
	case UPDATE_PLAYER_CASH:
		return [...action.payload];
	case UPDATE_PLAYER_ACTION_STATS:
		return [...action.payload];
	default:
		return state;
	}
}

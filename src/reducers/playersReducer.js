import {
	RESET_PLAYERS_TO_DEFAULT,
	CREATE_PLAYERS,
	DEAL_CARDS_TO_PLAYER,
	UPDATE_PLAYER_CASH,
	UPDATE_PLAYER_ACTION_STATS,
	ADD_DETERMINED_HANDS_TO_PLAYERS,
	AWARD_POT_TO_PLAYER,
	RESET_PLAYER_CURRENT_BETS
} from '../actions/types';

const initialState = {
	loading: false,
	details: []
};

export default function(state = initialState, action) {
	switch(action.type) {
	case RESET_PLAYERS_TO_DEFAULT:
		return {...action.payload};
	case CREATE_PLAYERS:
		return {...action.payload};
	case DEAL_CARDS_TO_PLAYER:
		return {...action.payload};
	case UPDATE_PLAYER_CASH:
		return {...action.payload};
	case UPDATE_PLAYER_ACTION_STATS:
		return {...action.payload};
	case ADD_DETERMINED_HANDS_TO_PLAYERS:
		return {...action.payload};
	case AWARD_POT_TO_PLAYER:
		return {...action.payload};
	case RESET_PLAYER_CURRENT_BETS:
		return {...action.payload};
	default:
		return state;
	}
}

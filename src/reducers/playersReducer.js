import { CREATE_PLAYERS, DEAL_CARDS_TO_PLAYER } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
	switch(action.type) {
	case CREATE_PLAYERS:
		return {
			...state,
			...action.payload
		};
	case DEAL_CARDS_TO_PLAYER:
		console.log('runing DEAL_CARDS_TO_PLAYER');
		return {
			...state,
			...action.payload
		};
	default:
		return state;
	}
}

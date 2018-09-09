import { DEAL_TABLE_CARDS, SHOW_FLOP_CARDS, SHOW_TURN_CARDS, SHOW_RIVER_CARD } from '../actions/types';

const initialState = {
	flop: false,
	turn: false,
	river: false,
};

export default function(state = initialState, action) {
	switch(action.type) {
	case DEAL_TABLE_CARDS:
		return {
			...state,
			items: action.payload
		};
	case SHOW_FLOP_CARDS:
		return {
			...state,
			items: action.payload
		};
	case SHOW_TURN_CARDS:
		return {
			...state,
			items: action.payload
		};
	case SHOW_RIVER_CARD:
		return {
			...state,
			items: action.payload
		};
	default:
		return state;
	}
}

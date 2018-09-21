import { RESET_TABLE_CARD_STATUS_TO_DEFAULT, SHOW_FLOP_CARDS, SHOW_TURN_CARDS, SHOW_RIVER_CARD } from '../actions/types';

const initialState = {
	flopIsVisible: false,
	turnIsVisible: false,
	riverIsVisible: false
};

export default function(state = initialState, action) {
	switch(action.type) {
	case RESET_TABLE_CARD_STATUS_TO_DEFAULT:
		return {...action.payload};
	case SHOW_FLOP_CARDS:
		return {
			...state,
			flopIsVisible: action.payload
		};
	case SHOW_TURN_CARDS:
		return {
			...state,
			turnIsVisible: action.payload
		};
	case SHOW_RIVER_CARD:
		return {
			...state,
			riverIsVisible: action.payload
		};
	default:
		return state;
	}
}

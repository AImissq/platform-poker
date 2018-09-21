import { RESET_TABLE_CARDS_TO_DEFAULT, DEAL_TABLE_CARDS  } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
	switch(action.type) {
	case RESET_TABLE_CARDS_TO_DEFAULT:
		return {...action.payload};
	case DEAL_TABLE_CARDS:
		return {
			...state,
			...action.payload
		};
	default:
		return state;
	}
}

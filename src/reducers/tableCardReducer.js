import { DEAL_TABLE_CARDS  } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
	switch(action.type) {
	case DEAL_TABLE_CARDS:
		return {
			...state,
			...action.payload
		};
	default:
		return state;
	}
}

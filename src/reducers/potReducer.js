import { RESET_POT_TO_DEFAULT, ADD_TO_POT  } from '../actions/types';

const initialState = {
	loading: false,
	details: [{
		total: 0,
		players: [],
		playerCanCheck: false,
		full: false
	}]
};

export default function(state = initialState, action) {
	switch(action.type) {
	case RESET_POT_TO_DEFAULT:
		return {...action.payload};
	case ADD_TO_POT:
		return {...action.payload};
	default:
		return state;
	}
}

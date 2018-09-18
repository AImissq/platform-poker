import { ADD_TO_POT  } from '../actions/types';

const initialState = [
	{
		total: 0,
		players: [],
		playerCanCheck: false,
		full: false
	}
];

export default function(state = initialState, action) {
	switch(action.type) {
	case ADD_TO_POT:
		return [...action.payload];
	default:
		return state;
	}
}

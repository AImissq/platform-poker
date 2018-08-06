import { FETCH_POSTS, NEW_POST } from './types';

export const fetchPosts = () => dispatch => {
    dispatch({
        type: FETCH_POSTS,
        payload: {} // new state
    })
}

// change components' initial state to this payload
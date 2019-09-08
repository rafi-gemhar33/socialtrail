import {
	// ADD_MESSAGE,
	// SET_LOADING,
	ADD_YT_DATA,
	ADD_YT_ACCOUNT,
	YT_CLEAR,
	SET_YT_FOLLOW,
	YT_ERROR,
} from '../actions/types';

const initialState = {
	message: '',
	videos: null,
	isLoading: false,
	account: null,
	isFollowing: false,
	error: '',
	followingAccounts: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_YT_ACCOUNT:
			return {
				...state,
				account: action.payload.account,
				isFollowing: action.payload.isFollowing,
				isLoading: false,
			};
		case ADD_YT_DATA:
			return {
				...state,
				videos: action.payload,
				isLoading: false,
			};

		case YT_CLEAR:
			return {
				message: '',
				videos: null,
				isLoading: false,
				account: null,
				isFollowing: false,
				error: '',
				followingAccounts: [],
			};

		case SET_YT_FOLLOW:
			return {
				...state,
				isFollowing: action.payload,
				loading: false,
			};

		case YT_ERROR:
			console.log(action.payload);
			return {
				...state,
				error: action.payload,
				loading: false,
			};

		default:
			return state;
	}
};

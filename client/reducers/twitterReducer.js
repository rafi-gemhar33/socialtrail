import {
	ADD_TWEETS,
	ADD_ACCOUNT,
	ADD_MESSAGE,
	SET_LOADING,
	SET_FOLLOW,
	TWITTER_ERROR,
	ADD_FOLLOWING_ACCOUNTS,
} from '../actions/types';

const initialState = {
	message: '',
	tweets: null,
	isLoading: false,
	account: null,
	isFollowing: false,
	error: '',
	followingAccounts: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_ACCOUNT:
			return {
				...state,
				account: action.payload.account,
				isFollowing: action.payload.isFollowing,
				message: '',
				isLoading: false,
			};
		case ADD_TWEETS:
			return {
				...state,
				tweets: action.payload,
				message: '',
				isLoading: false,
			};
		case ADD_MESSAGE:
			return {
				...state,
				message: action.payload,
				isLoading: false,
			};
		case SET_FOLLOW:
			return {
				...state,
				isFollowing: action.payload,
				isLoading: false,
			};
		case ADD_FOLLOWING_ACCOUNTS:
			return {
				...state,
				followingAccounts: action.payload,
				isLoading: false,
			};
		case SET_LOADING:
			return {
				...state,
				message: '',
				isLoading: true,
			};
		case TWITTER_ERROR:
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

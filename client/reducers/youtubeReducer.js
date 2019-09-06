import {
	ADD_MESSAGE,
	SET_LOADING,
	SET_FOLLOW,
	TWITTER_ERROR,
	ADD_FOLLOWING_ACCOUNTS,
	ADD_YT_ACCOUNT,
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

export default (state = {initialState}, action) => {
	switch (action.type) {
		default:
			// console.log('in Reducer selected YT');
			return state;
	}
};

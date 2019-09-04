const initialState = {
	user: null,
};

function twitterReduecr(state = initialState, action) {
	switch (action.type) {
		case 'Twi':
			return {
				...state,
				user: action.data,
				isAuthInProgress: false
			};

		default:
			return state;
	}
}

export default twitterReduecr;

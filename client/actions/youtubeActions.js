import {
	ADD_MESSAGE,
	SET_LOADING,
	SET_FOLLOW,
	TWITTER_ERROR,
	ADD_FOLLOWING_ACCOUNTS,
	ADD_YT_ACCOUNT,
} from './types';

export const addYoutubeAccount = username => async dispatch => {
	try {
		// setLoading();
		console.log('in Action selected YT');

		const channelRes = await fetch(
			`http://localhost:3000/api/v1/youtube/channel/${username}`
		);
		const channelData = await channelRes.json();

		if (channelData.success && channelData.account) {
			// console.log(channelData.account.id, "!!!!!!!!!!", channelData.account);

			const searchlRes = await fetch(
				`http://localhost:3000/api/v1/youtube/searchList/${channelData.account.id}`
			);

			const searchlData = await searchlRes.json();
			console.log(searchlData, '!!!!!!!!!!');

			dispatch({
				type: ADD_YT_ACCOUNT,
				payload: { searchlData },
			});
		} else {
			dispatch({
				type: ADD_MESSAGE,
				payload: 'it seems the username does not exist check again-Account',
			});
		}
	} catch (error) {
		dispatch({
			type: TWITTER_ERROR,
			payload: error,
		});
	}
};

// export const setFollow = (
// 	loggedUser,
// 	account,
// 	targetName
// ) => async dispatch => {
// 	try {
// 		const method = targetName === 'follow' ? 'POST' : 'DELETE';
// 		const url = 'http://localhost:3000/api/v1//users/twitter/follow';
// 		const token = localStorage.getItem('jwt') || '';
// 		const res = await fetch(`${url}`, {
// 			method: method,
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Accept: 'application/json',
// 				Authorization: token,
// 			},
// 			body: JSON.stringify({
// 				user: loggedUser,
// 				account: account,
// 			}),
// 		});

// 		const data = await res.json();
// 		dispatch({ type: 'UPDATE_USER_SUCCESS', data: data });
// 		const isFollowing = data.user.followingAccounts.includes(account._id);
// 		dispatch({
// 			type: SET_FOLLOW,
// 			payload: isFollowing,
// 		});
// 	} catch (error) {
// 		dispatch({
// 			type: TWITTER_ERROR,
// 			payload: error,
// 		});
// 	}
// };

// export const setFollowingAccounts = id => async dispatch => {
// 	try {
// 		const res = await fetch(`http://localhost:3000/api/v1/users/${id}`);
// 		const data = await res.json();

// 		if (data.success) {
// 			const accounts = data.user.followingAccounts;
// 			dispatch({
// 				type: ADD_FOLLOWING_ACCOUNTS,
// 				payload: accounts,
// 			});
// 		}
// 	} catch (error) {
// 		dispatch({
// 			type: TWITTER_ERROR,
// 			payload: error,
// 		});
// 	}
// };

// export const setLoading = () => {
// 	return {
// 		type: SET_LOADING,
// 	};
// };

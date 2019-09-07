import {
	ADD_MESSAGE,
	SET_LOADING,

	ADD_YT_DATA,
	ADD_YT_ACCOUNT,
	SET_YT_FOLLOW,
	YT_CLEAR,
	YT_ERROR,
} from './types';

export const addYoutubeAccount = (loggedUser, username) => async dispatch => {
	try {
		setLoading();

		const channelRes = await fetch(
			`http://localhost:3000/api/v1/youtube/channel/${username}`
		);
		const channelData = await channelRes.json();

		if (channelData.success && channelData.account) {
			const {account} = channelData
			const isFollowing = !!(
				loggedUser && loggedUser.followingAccounts.includes(account._id)
			);
			dispatch({
				type: ADD_YT_ACCOUNT,
				payload: {account, isFollowing},
			});

			const searchlRes = await fetch(
				`http://localhost:3000/api/v1/youtube/searchList/${channelData.account.id_str}`
			);

			const searchlData = await searchlRes.json();

			if (searchlData.success && searchlData.items) {
				dispatch({
					type: ADD_YT_DATA,
					payload: searchlData.items,
				});
			}
		} else {
			dispatch({
				type: ADD_MESSAGE,
				payload: 'it seems the username does not exist check again-Account',
			});
		}
	} catch (error) {
		dispatch({
			type: YT_ERROR,
			payload: error,
		});
	}
};

export const setLoading = () => {
	return {
		type: SET_LOADING,
	};
};

export const setYoutubeFollow = (
	loggedUser,
	account,
	targetName
) => async dispatch => {
	try {
		const method = targetName === 'follow' ? 'POST' : 'DELETE';
		const url = 'http://localhost:3000/api/v1/users/youtube/follow';
		const token = localStorage.getItem('jwt') || '';
		const res = await fetch(`${url}`, {
			method: method,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: token,
			},
			body: JSON.stringify({
				user: loggedUser,
				account: account,
			}),
		});

		const data = await res.json();
		dispatch({ type: 'UPDATE_USER_SUCCESS', data: data });
		const isFollowing = data.user.followingYoutubeAccounts.includes(account._id);
		dispatch({
			type: SET_YT_FOLLOW,
			payload: isFollowing,
		});
	} catch (error) {
		dispatch({
			type: YT_ERROR,
			payload: error,
		});
	}
};

export const clearYoutube = () => {
	return {
		type: YT_CLEAR,
	};
};

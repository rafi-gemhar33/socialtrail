import {
	ADD_TWEETS,
	ADD_ACCOUNT,
	ADD_MESSAGE,
	SET_LOADING,
	SET_FOLLOW,
	TWITTER_ERROR,
	TWITTER_CLEAR,
	ADD_FOLLOWING_ACCOUNTS,
} from './types';

export const addAccount = (loggedUser, accountUsername) => async dispatch => {
	try {
		setLoading();
		const res = await fetch('http://localhost:3000/api/v1/twitter/account', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username: accountUsername }),
		});

		const data = await res.json();

		if (data.success) {
			const { account } = data;

			const isFollowing = !!(
				loggedUser && loggedUser.followingAccounts.includes(account._id)
			);

			dispatch({
				type: ADD_ACCOUNT,
				payload: { account, isFollowing },
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

export const addTweets = searchText => async dispatch => {
	try {
		setLoading();
		const res = await fetch('http://localhost:3000/api/v1/twitter/tweets', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username: searchText }),
		});

		const data = await res.json();

		if (data.success) {
			let sortedTweets = sortByDays(data.tweets);

			dispatch({
				type: ADD_TWEETS,
				payload: sortedTweets,
			});
		} else {
			dispatch({
				type: ADD_MESSAGE,
				payload: 'Tere is some issues fetching tweets try again...',
			});
		}
	} catch (error) {
		console.log(error);
		dispatch({
			type: TWITTER_ERROR,
			payload: error,
		});
	}
};

export const setFollow = (
	loggedUser,
	account,
	targetName
) => async dispatch => {
	try {
		const method = targetName === 'follow' ? 'POST' : 'DELETE';
		const url = 'http://localhost:3000/api/v1/users/twitter/follow';
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
		const isFollowing = data.user.followingAccounts.includes(account._id);
		dispatch({
			type: SET_FOLLOW,
			payload: isFollowing,
		});
	} catch (error) {
		dispatch({
			type: TWITTER_ERROR,
			payload: error,
		});
	}
};

export const setfollowingAccounts = id => async dispatch => {
	try {
		const res = await fetch(`http://localhost:3000/api/v1/users/${id}`);
		const data = await res.json();

		if (data.success) {
			const accounts = {
				twitter: data.user.followingAccounts,
				youtube: data.user.followingYoutubeAccounts,
			};
			dispatch({
				type: ADD_FOLLOWING_ACCOUNTS,
				payload: accounts,
			});
		}
	} catch (error) {
		dispatch({
			type: TWITTER_ERROR,
			payload: error,
		});
	}
};

export const clearTwitter = () => {
	return {
		type: TWITTER_CLEAR,
	};
};

export const setLoading = () => {
	return {
		type: SET_LOADING,
	};
};

export const addMessage = message => {
	return {
		type: ADD_MESSAGE,
		payload: message,
	};
};

const sortByDays = tweets => {
	let tweetsObj = tweets.reduce((acc, curr) => {
		let day = curr.created_at.slice(4, 11) + curr.created_at.slice(-4);
		const {
			created_at,
			id_str,
			text,
			truncated,
			retweet_count,
			favorite_count,
		} = curr;
		let trimmedTweet = {
			created_at,
			id_str,
			text,
			truncated,
			retweet_count,
			favorite_count,
		};
		if (acc.hasOwnProperty(day)) {
			acc[day].tweets.push(trimmedTweet);
			acc[day].totalLikes += trimmedTweet.favorite_count;
			acc[day].totalRT += trimmedTweet.retweet_count;
		} else {
			acc[day] = {};
			acc[day].tweets = [trimmedTweet];
			acc[day].totalLikes = trimmedTweet.favorite_count;
			acc[day].totalRT = trimmedTweet.retweet_count;
		}
		acc[day].avgLikes = +(acc[day].totalLikes / acc[day].tweets.length).toFixed(
			2
		);
		acc[day].avgRT = +(acc[day].totalRT / acc[day].tweets.length).toFixed(2);
		acc[day].avgEngagement = +(
			((acc[day].totalRT + acc[day].totalLikes) /
				tweets[0].user.followers_count) *
			100
		).toFixed(2);

		return acc;
	}, {});

	let sortedTweets = [];
	for (let key in tweetsObj) {
		sortedTweets.push([key, tweetsObj[key]]);
	}

	sortedTweets.sort((a, b) => {
		return new Date(b[0]).getTime() - new Date(a[0]).getTime();
	});

	return sortedTweets;
};

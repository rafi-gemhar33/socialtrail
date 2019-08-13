import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Chart from './Chart';
import Table from './Table';
import UserCard from './UserCard';
import { testTweets, testUser } from '../../tweet';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

class SearchUser extends Component {
	state = {
		username: 'dprank',
		message: 'pre filled for testing',
		tweets: null,
		isLoading: false,
		user: null,
		catagory: ''
	};

	componentDidMount() {
		// Auto initialize all the things!
		M.AutoInit();
	}

	handleClick = () => {
		console.log('in handle click');
		event.preventDefault();
		//Testing data
		// this.setState({ tweets: testTweets, isLoading: false, user: testUser });
		if (this.state.username.length > 0) {
			this.setState({ isLoading: true });
			fetch('http://localhost:3000/api/v1/twitter', {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				mode: 'cors', // no-cors, cors, *same-origin
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'same-origin', // include, *same-origin, omit
				headers: {
					'Content-Type': 'application/json'
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				redirect: 'follow', // manual, *follow, error
				referrer: 'no-referrer', // no-referrer, *client
				body: JSON.stringify({ username: this.state.username })
			})
				.then(response => {
					return response.json();
				})
				.then(res => {
					if (res.success) {
						let { sortedTweets, user } = this.sortByDays(res.tweets);
						console.log(sortedTweets, user);

						this.setState({ tweets: sortedTweets, isLoading: false, user });
					} else {
						console.log(res);
						this.setState({
							message: 'it seems the username does not exist check again',
							isLoading: false
						});
					}
				});
		} else {
			this.setState({
				message: 'why the hell are you searching for a empty username'
			});
		}
	};

	sortByDays(tweets) {
		console.log('in sortByDays method');

		const { user } = tweets[0];

		let tweetsObj = tweets.reduce((acc, curr) => {
			let day = curr.created_at.slice(4, 11) + curr.created_at.slice(-4);
			const { created_at, id_str, text, truncated, retweet_count, favorite_count } = curr;
			let trimmedTweet = {
				created_at,
				id_str,
				text,
				truncated,
				retweet_count,
				favorite_count
			};
			if (acc.hasOwnProperty(day)) {
				acc[day].tweets.push(trimmedTweet);
				acc[day].totalLikes += trimmedTweet.favorite_count;
				acc[day].totalRT += trimmedTweet.retweet_count;
				acc[day].avgRT = +(acc[day].totalRT / acc[day].tweets.length).toFixed(2);
				acc[day].avgLikes = +(acc[day].totalLikes / acc[day].tweets.length).toFixed(2);
				acc[day].avgEngagement = +(((acc[day].totalRT + acc[day].totalLikes) / user.followers_count) * 100).toFixed(2);
			} else {
				acc[day] = {};
				acc[day].tweets = [trimmedTweet];
				acc[day].totalLikes = trimmedTweet.favorite_count;
				acc[day].totalRT = trimmedTweet.retweet_count;
				acc[day].avgRT = +(acc[day].totalRT / acc[day].tweets.length).toFixed(2);
				acc[day].avgLikes = +(acc[day].totalLikes / acc[day].tweets.length).toFixed(2);
				acc[day].avgEngagement = +(((acc[day].totalRT + acc[day].totalLikes) / user.followers_count) * 100).toFixed(2);
			}
			return acc;
		}, {});

		let sortedTweets = [];
		for (let key in tweetsObj) {
			sortedTweets.push([key, tweetsObj[key]]);
		}

		sortedTweets.sort((a, b) => {
			return new Date(b[0]).getTime() - new Date(a[0]).getTime();
		});
		return { user, tweetsObj, sortedTweets };
	}

	handleChange = ev => {
		this.setState({ username: ev.target.value, message: '' });
	};

	dropdownChanged = e => {
		console.log(e, 'dropdownChanged');
		this.setState({ catagory: e.target.value });
	};

	render() {
		const { username, message, isLoading, user, tweets } = this.state;
		return (
			<div className="row">
				<div className="col s8 offset-s2">
					<div className="form-container row">
						<form className="col s8 offset-s2">
							{
								<div
									className="input-field col s12"
									style={{
										padding: 0
									}}
								>
									<select ref="dropdown" value={this.state.catagory} onChange={this.dropdownChanged}>
										<option value="" disabled>
											Choose your option
										</option>
										<option value="twitter">Twitter</option>
										<option value="instagram">Instagram</option>
										<option value="youtube">Youtube</option>
									</select>
								</div>
							}
							<div>
								<input type="text" placeholder="username" value={username} onChange={this.handleChange} />
								<button className="waves-effect waves-light btn" onClick={this.handleClick}>
									Search
								</button>
							</div>
							<p className="error">{message}</p>
						</form>
					</div>
					{isLoading ? <p>Loading...</p> : <></>}
					{user ? <UserCard account={user} /> : null}
					{tweets ? (
						<>
							<Chart chartData={tweets} user={user} />
							<Table tableData={tweets} user={user} />
						</>
					) : null}
				</div>
			</div>
		);
	}
}

export default SearchUser;

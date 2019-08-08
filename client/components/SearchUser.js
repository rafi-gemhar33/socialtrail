import React, { Component } from "react";
// import axios from "axios";
import Chart from "./Chart";

class SearchUser extends Component {
	state = {
		username: "emmawedekind",
		message: "",
		tweets: null,
		isLoading: false,
		user: null
	};

	hanhleClick = () => {
		if (this.state.username.length > 0) {
			this.setState({ isLoading: true });
			fetch("http://localhost:3000/api/v1/twitter", {
				method: "POST", // *GET, POST, PUT, DELETE, etc.
				mode: "cors", // no-cors, cors, *same-origin
				cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				credentials: "same-origin", // include, *same-origin, omit
				headers: {
					"Content-Type": "application/json"
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				redirect: "follow", // manual, *follow, error
				referrer: "no-referrer", // no-referrer, *client
				body: JSON.stringify({ username: this.state.username })
			})
				.then(response => {
					return response.json();
				})
				.then(res => {
					if (res.success) {
						let { sortedTweets, user } = this.sortByDays(res.tweets);
						this.setState({ tweets: sortedTweets, isLoading: false, user });
					} else {
						this.setState({
							message: "it seems the username does not exist check again",
							isLoading: false
						});
					}
				});
		} else {
			this.setState({
				message: "why the hell are you searching for a empty username"
			});
		}
	};

	sortByDays(tweets) {
		const { user } = tweets[0];

		let tweetsObj = tweets.reduce((acc, curr) => {
			let day = curr.created_at.slice(4, 11) + curr.created_at.slice(-4);
			const {
				created_at,
				id_str,
				text,
				truncated,
				retweet_count,
				favorite_count
			} = curr;
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
				acc[day].avgRT = +(acc[day].totalRT / acc[day].tweets.length).toFixed(
					2
				);
				acc[day].avgLikes = +(
					acc[day].totalLikes / acc[day].tweets.length
				).toFixed(2);
				acc[day].avgEngagement = +(
					((acc[day].totalRT + acc[day].totalLikes) / user.followers_count) *
					100
				).toFixed(2);
			} else {
				acc[day] = {};
				acc[day].tweets = [trimmedTweet];
				acc[day].totalLikes = trimmedTweet.favorite_count;
				acc[day].totalRT = trimmedTweet.retweet_count;
				acc[day].avgRT = +(acc[day].totalRT / acc[day].tweets.length).toFixed(
					2
				);
				acc[day].avgLikes = +(
					acc[day].totalLikes / acc[day].tweets.length
				).toFixed(2);
				acc[day].avgEngagement = +(
					((acc[day].totalRT + acc[day].totalLikes) / user.followers_count) *
					100
				).toFixed(2);
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
		this.setState({ username: ev.target.value, message: "" });
	};

	render() {
		const {username, message, isLoading, user, tweets} = this.state;
		return (
			<>
				<div>
					<div className="">
						<select>
							<option value="0">Twitter</option>
							<option value="1">Instagram</option>
						</select>
					</div>
					<input
						type="text"
						placeholder="username"
						value={username}
						onChange={this.handleChange}
					/>
					<button onClick={this.hanhleClick}>Search 999</button>
					<p>{message}</p>
					{isLoading ? <p>Loading...</p> : <></>}
				</div>
				{
					tweets ? <Chart chartData={tweets} user={user} location="" legendPosition=""/> : null
				}
				
			</>
		);
	}
}

export default SearchUser;

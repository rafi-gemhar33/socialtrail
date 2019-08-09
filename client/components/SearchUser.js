import React, { Component } from "react";
// import axios from "axios";

import Chart from "./Chart";
import Table from "./Table";
import UserCard from "./UserCard"
import { testTweets, testUser } from "../../tweet";
class SearchUser extends Component {
	state = {
		username: "emmawedekind",
		message: "",
		tweets: null,
		isLoading: false,
		user: null
	};

	handleClick = () => {
		// console.log(testTweets);
		this.setState({ tweets: testTweets, isLoading: false, user: testUser });
		// if (this.state.username.length > 0) {
		// 	this.setState({ isLoading: true });
		// 	fetch("http://localhost:3000/api/v1/twitter", {
		// 		method: "POST", // *GET, POST, PUT, DELETE, etc.
		// 		mode: "cors", // no-cors, cors, *same-origin
		// 		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		// 		credentials: "same-origin", // include, *same-origin, omit
		// 		headers: {
		// 			"Content-Type": "application/json"
		// 			// 'Content-Type': 'application/x-www-form-urlencoded',
		// 		},
		// 		redirect: "follow", // manual, *follow, error
		// 		referrer: "no-referrer", // no-referrer, *client
		// 		body: JSON.stringify({ username: this.state.username })
		// 	})
		// 		.then(response => {
		// 			return response.json();
		// 		})
		// 		.then(res => {
		// 			if (res.success) {
		// 				let { sortedTweets, user } = this.sortByDays(res.tweets);
		// 				console.log(sortedTweets, user);

		// 				this.setState({ tweets: sortedTweets, isLoading: false, user });
		// 			} else {
		// 				console.log(res);
		// 				this.setState({
		// 					message: "it seems the username does not exist check again",
		// 					isLoading: false
		// 				});
		// 			}
		// 		});
		// } else {
		// 	this.setState({
		// 		message: "why the hell are you searching for a empty username"
		// 	});
		// }
	};

	sortByDays(tweets) {
		console.log("in sortByDays method");

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
		const { username, message, isLoading, user, tweets } = this.state;
		return (
			<div className="row">
				<div className="col s8 offset-s2">
					<div className="form-container">
						{/* <form> */}
						<div className="input-field">
							<select className="browser-default">
								<option>Twitter</option>
								<option>Instagram</option>
							</select>
							{/* <label>Social media</label> */}
						</div>
						<div>
							<input
								type="text"
								placeholder="username"
								value={username}
								onChange={this.handleChange}
							/>
							<button className="btn " onClick={this.handleClick}>
								Search
							</button>
						</div>
						{/* </form> */}
						<p>{message}</p>
						{isLoading ? <p>Loading...</p> : <></>}
					</div>
					{user ? (
						<UserCard user={user} />
					) : null}
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

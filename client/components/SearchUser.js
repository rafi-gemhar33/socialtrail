import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chart from './Chart';
import Table from './Table';
import UserCard from './UserCard';
import { testTweets, testUser } from '../../tweet';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

class SearchUser extends Component {
	state = {
		username: '',
		message: '',
		tweets: null,
		isLoading: false,
		account: null,
		catagory: '',
		isFollowing: false
	};

	componentDidMount() {
		// Auto initialize all the things!
		M.AutoInit();
	}

	handleFollow = () => {
		const isFollowing =
			this.props.currentUser &&
			this.props.currentUser.user &&
			this.props.currentUser.user.followingAccounts.includes(
				this.state.account && this.state.account._id
			);
		this.setState({ isFollowing });
	};

	handleSearch = () => {
		event.preventDefault();
		//Testing data
		// this.setState({ tweets: testTweets, isLoading: false, account: testUser });

		if (this.state.username.length > 0) {
			this.setState({ isLoading: true });

			if (this.state.catagory === 'twitter') {
				this.fetchTwitterAccount();
				this.fetchAllTweets();
			} else if (this.state.catagory === 'instagram') {
				//Do Insta stuff
				this.setState({
					message: 'Instagram trails is coming soon...',
					isLoading: false
				});
			} else if (this.state.catagory === 'youtube') {
				//Do Youtube stuff
				this.setState({
					message: 'Youtube trails is coming soon...',
					isLoading: false
				});
			} else {
				this.setState({
					message: 'Please select a valid social media',
					isLoading: false
				});
			}
		} else {
			this.setState({
				message: 'why the hell are you searching for a empty username'
			});
		}
	};

	fetchTwitterAccount() {
		fetch('http://localhost:3000/api/v1/twitter/account', {
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
					const account = res.account;
					// console.log(this.props.currentUser.user);

					const isFollowing = !!(
						this.props.currentUser &&
						this.props.currentUser.user &&
						this.props.currentUser.user.followingAccounts.includes(account._id)
					);

					this.setState({ account, isFollowing });
				} else {
					this.setState({
						message: 'it seems the username does not exist check again-Account',
						isLoading: false,
						message: ''
					});
				}
			});
	}

	fetchAllTweets() {
		fetch('http://localhost:3000/api/v1/twitter/tweets', {
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
					let { sortedTweets, account } = this.sortByDays(res.tweets);
					this.setState({ tweets: sortedTweets, isLoading: false });
				} else {
					this.setState({
						message: 'it seems the username does not exist check again -TWEETS',
						isLoading: false
					});
				}
			});
	}
	sortByDays(tweets) {
		const account = this.state.account || {};

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
					((acc[day].totalRT + acc[day].totalLikes) / account.followers_count) *
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
					((acc[day].totalRT + acc[day].totalLikes) / account.followers_count) *
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

		return { account, tweetsObj, sortedTweets };
	}

	handleChange = ev => {
		this.setState({ username: ev.target.value, message: '' });
	};

	dropdownChanged = e => {
		this.setState({ catagory: e.target.value });
	};

	render() {
		const {
			username,
			message,
			isLoading,
			account,
			tweets,
			isFollowing
		} = this.state;
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
									<select
										ref="dropdown"
										value={this.state.catagory}
										onChange={this.dropdownChanged}
									>
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
								<input
									type="text"
									placeholder="username"
									value={username}
									onChange={this.handleChange}
								/>
								<button
									className="waves-effect waves-light btn"
									onClick={this.handleSearch}
								>
									Search
								</button>
							</div>
							<p className="error">{message}</p>
						</form>
					</div>
					{isLoading ? <p>Loading...</p> : <></>}
					{account ? (
						<UserCard
							account={account}
							isFollowing={isFollowing}
							handleFollow={this.handleFollow}
						/>
					) : null}
					{tweets ? (
						<>
							<Chart chartData={tweets} account={account} />
							<Table tableData={tweets} account={account} />
						</>
					) : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.currentUser.user
	};
};

export default connect(mapStateToProps)(SearchUser);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chart from './Chart';
import Table from './Table';
import UserCard from './UserCard';
import M from 'materialize-css';

import {
	setLoading,
	addAccount,
	setFollow,
	addTweets,
	addMessage,
} from '../actions/twitterActions';

import { addYoutubeAccount } from '../actions/youtubeActions';

class SearchUser extends Component {
	state = {
		//TODO remove default values
		username: 'geekyranjit',
		catagory: 'twitter',
	};

	componentDidMount() {
		// Auto initialize all the things!
		M.AutoInit();
	}

	handleFollow = (targetName, account) => {
		this.props.setFollow(this.props.user, account, targetName);
	};

	handleSearch = event => {
		event.preventDefault();

		if (this.state.username.length > 0) {
			if (this.state.catagory === 'twitter') {
				this.props.addAccount(this.props.user, this.state.username);
				this.props.addTweets(this.state.username);
			} else if (this.state.catagory === 'instagram') {
				//Do Insta stuff
				this.props.addMessage('Youtube trails is coming soon...');
			} else if (this.state.catagory === 'youtube') {
				//Do Youtube stuff
				console.log('in component selected YT');

				this.props.addYoutubeAccount(this.state.username);
				// this.props.addMessage('Youtube trails is coming soon...');
			} else {
				this.props.addMessage('Please select a valid social media');
			}
		} else {
			this.props.addMessage('Please select a valid social media');
		}
	};

	handleChange = ev => {
		this.setState({ username: ev.target.value, message: '' });
	};

	dropdownChanged = e => {
		this.setState({ catagory: e.target.value });
	};

	render() {
		const { username, catagory } = this.state;
		const { account, isFollowing, tweets, message, isLoading } = this.props;

		return (
			<div className="row">
				<div className="col s8 offset-s2">
					<div className="form-container row">
						<form className="col s8 offset-s2">
							{
								<div
									className="input-field col s12"
									style={{
										padding: 0,
									}}
								>
									<select
										ref="dropdown"
										value={catagory}
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
					{account && (
						<UserCard
							account={account}
							handleFollow={this.handleFollow}
							isFollowing={isFollowing}
						/>
					)}
					{tweets && account && (
						<>
							<Chart tweets={tweets} account={account} />
							<Table tableData={tweets} account={account} />
						</>
					)}
					{isLoading ? <p>Loading...</p> : <></>}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.currentUser.user && state.currentUser.user.user,
		account: state.twitter.account,
		isFollowing: state.twitter.isFollowing,
		tweets: state.twitter.tweets,
		message: state.twitter.message,
		isLoading: state.twitter.setLoading,
	};
};

// const mapActionsToProps = state => {
// 	return {
// 		user: state.currentUser.user && state.currentUser.user.user,
// 		account: state.twitter.account,
// 		isFollowing: state.isFollowing,
// 	};
// };

export default connect(
	mapStateToProps,
	{
		addAccount,
		setLoading,
		setFollow,
		addTweets,
		addMessage,
		addYoutubeAccount,
	}
)(SearchUser);

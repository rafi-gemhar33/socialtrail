import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';

import TwitterChart from '../twitter/TwitterChart';
import TwitterTable from '../twitter/TwitterTable';
import TwitterUserCard from '../twitter/TwitterUserCard';
import YoutubeChart from '../youtube/YoutubeChart';
import YoutubeTable from '../youtube/YoutubeTable';
import YoutubeUserCard from '../youtube/YoutubeUserCard';
import {
	setLoading,
	addAccount,
	setFollow,
	addTweets,
	addMessage,
	clearTwitter,
} from '../../actions/twitterActions';

import {
	addYoutubeAccount,
	clearYoutube,
	setYoutubeFollow,
} from '../../actions/youtubeActions';

class SearchUser extends Component {
	state = {
		//TODO remove default values
		username: 'geekyranjit',
		catagory: 'youtube',
	};

	componentDidMount() {
		// Auto initialize all the things!
		M.AutoInit();
	}

	handleFollow = (targetName, account) => {
		this.props.setFollow(this.props.user, account, targetName);
	};

	handleYoutubeFollow = (targetName, account) => {
		this.props.setYoutubeFollow(this.props.user, account, targetName);
	};

	handleSearch = event => {
		event.preventDefault();

		// TODO clear the previos search results
		this.props.clearTwitter();
		this.props.clearYoutube();

		if (this.state.username.length > 0) {
			if (this.state.catagory === 'twitter') {
				this.props.addAccount(this.props.user, this.state.username);
				this.props.addTweets(this.state.username);
			} else if (this.state.catagory === 'instagram') {
				//Do Insta stuff
				this.props.addMessage('Youtube trails is coming soon...');
			} else if (this.state.catagory === 'youtube') {
				this.props.addYoutubeAccount(this.props.user, this.state.username);
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
		const {
			twitterAccount,
			isFollowing,
			tweets,
			message,
			isLoading,
			youtubeAccount,
			youtubeItems,
			youtubeFollow
		} = this.props;

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
					{twitterAccount && (
						<TwitterUserCard
							account={twitterAccount}
							handleFollow={this.handleFollow}
							isFollowing={isFollowing}
						/>
					)}
					{tweets && twitterAccount && (
						<>
							<TwitterChart tweets={tweets} account={twitterAccount} />
							<TwitterTable tableData={tweets} account={twitterAccount} />
						</>
					)}
					{youtubeAccount && (
						<YoutubeUserCard
							account={youtubeAccount}
							handleFollow={this.handleYoutubeFollow}
							isFollowing={youtubeFollow}
						/>
					)}
					{youtubeAccount && youtubeItems && (
						<>
							<YoutubeChart items={youtubeItems} account={youtubeAccount} />
							<YoutubeTable account={youtubeAccount} />
						</>
					)}
					{isLoading ? <p>Loading...</p> : <></>}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ currentUser, twitter, youtube }) => {
	return {
		user: currentUser.user && currentUser.user.user,
		//twitter state
		twitterAccount: twitter.account,
		isFollowing: twitter.isFollowing,
		tweets: twitter.tweets,
		//youtube state
		youtubeAccount: youtube.account,
		youtubeItems: youtube.videos,
		youtubeFollow: youtube.isFollowing,
		//common state
		isLoading: twitter.isLoading || youtube.isLoading,
		message: twitter.message || youtube.message,
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
		clearTwitter,
		addYoutubeAccount,
		clearYoutube,
		setYoutubeFollow,
	}
)(SearchUser);

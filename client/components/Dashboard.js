import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TwitterUserCard from './twitter/TwitterUserCard';
import YoutubeUserCard from './youtube/YoutubeUserCard';

import {
	setFollow,
	setfollowingAccounts,
	addAccount,
	addTweets,
	clearTwitter,
} from '../actions/twitterActions';

import { setYoutubeFollow, clearYoutube, addYoutubeAccount } from '../actions/youtubeActions';

class Dashboard extends React.Component {
	state = {
		redirect: false,
	};
	componentDidMount() {
		this.populateFollowers();
	}
	populateFollowers() {
		if (this.props.user) {
			this.props.setfollowingAccounts(this.props.user._id);
		}
	}
	handleFollow = async (targetName, account) => {
		await this.props.setFollow(this.props.user, account, targetName);
		this.populateFollowers();
	};
	handleYoutubeFollow = async (targetName, account) => {
		await this.props.setYoutubeFollow(this.props.user, account, targetName);
		this.populateFollowers();
	};
	showAccount(account) {
		this.props.clearYoutube();
		this.props.clearTwitter();

		this.props.addAccount(this.props.user, account.screen_name);
		this.props.addTweets(account.screen_name);
		this.setState({ redirect: true });
	}

	showYoutubeAccount(account) {
		this.props.clearYoutube();
		this.props.clearTwitter();

		this.props.addYoutubeAccount(this.props.user, account.searchName);
		this.setState({ redirect: true });
	}
	render() {
		const { accounts, youtubeAccount } = this.props;

		if (this.state.redirect) {
			return (
				<Redirect
					to={{
						pathname: '/',
					}}
				/>
			);
		}
		return (
			<div>
				<div className="row">
					<div className="col s8 offset-s2">
						<div className="form-container row">
							<h3>Twitter</h3>

							{accounts &&
								accounts.map(account => {
									return (
										<div className="custom-card">
											<TwitterUserCard
												account={account}
												handleFollow={this.handleFollow}
												isFollowing={true}
											/>

											<button
												className="btn btn-light btn-block btn-large full-btn"
												onClick={() => this.showAccount(account)}
											>
												Show Account
											</button>
										</div>
									);
								})}
							<h3>Youtube</h3>

							{youtubeAccount &&
								youtubeAccount.map(account => {
									return (
										<div className="custom-card">
											<YoutubeUserCard
												account={account}
												handleFollow={this.handleYoutubeFollow}
												isFollowing={true}
											/>

											<button
												className="btn btn-light btn-block btn-large full-btn"
												onClick={() => this.showYoutubeAccount(account)}
											>
												Show Account
											</button>
										</div>
									);
								})}

							{accounts &&
								youtubeAccount &&
								accounts.length + youtubeAccount.length < 1 && (
									<p>Currently you are not following any accounts</p>
								)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.currentUser.user && state.currentUser.user.user,
		accounts: state.twitter.followingAccounts,
		youtubeAccount: state.twitter.youtubeAccounts,
	};
}

export default connect(
	mapStateToProps,
	{
		setFollow,
		setfollowingAccounts,
		addAccount,
		addTweets,
		setYoutubeFollow,
		clearYoutube,
		clearTwitter,
		addYoutubeAccount,
	}
)(Dashboard);

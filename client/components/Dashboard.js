import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import UserCard from './UserCard';

import {
	setFollow,
	setFollowingAccounts,
	addAccount,
	addTweets,
} from '../actions/twitterActions';

class Dashboard extends React.Component {
	state = {
		redirect: false,
	};
	componentDidMount() {
		this.populateFollowers();
	}
	populateFollowers() {
		if (this.props.user) {
			this.props.setFollowingAccounts(this.props.user._id);
		}
	}
	handleFollow = async (targetName, account) => {
		await this.props.setFollow(this.props.user, account, targetName);
		this.populateFollowers();
	};
	showAccount(account) {
		this.props.addAccount(this.props.user, account.screen_name);
		this.props.addTweets(account.screen_name);
		this.setState({ redirect: true });
	}
	render() {
		const { accounts } = this.props;

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
							{accounts &&
								accounts.map(account => {
									return (
										<div className="custom-card">
											<UserCard
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
							{accounts && accounts.length < 1 && (
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
	};
}

export default connect(
	mapStateToProps,
	{ setFollow, setFollowingAccounts, addAccount, addTweets }
)(Dashboard);

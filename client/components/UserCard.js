import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class UserCard extends Component {
	
	handleFollow = ev => {
		if (this.props.currentUser) {
			this.props.handleFollow(ev.target.name, this.props.account);
		} else {
			this.props.history.push('/login');
		}
	};

	render() {
		return (
			<div className="row">
				<div className="col s12 m12">
					<div className="card ">
						<div className="card-image">
							<img
								className="banner"
								src={
									this.props.account.profile_banner_url ||
									'https://images.unsplash.com/photo-1488490579377-8ea9a560f5cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=500'
								}
							/>
							<div className="dp-box">
								<img
									className="dp circle responsive-img"
									src={this.props.account.profile_image_url.replace(
										'normal',
										'400x400'
									)}
								/>
							</div>
						</div>

						<div className="card-content user-content">
							<span className="card-title activator grey-text text-darken-4">
								{this.props.account.name}
								{!this.props.isFollowing ? (
									<button
										className="btn right"
										onClick={this.handleFollow}
										name="follow"
									>
										Follow
									</button>
								) : (
									<button
										className="btn right"
										onClick={this.handleFollow}
										name="unfollow"
									>
										Unfollow
									</button>
								)}
							</span>
							<p>{this.props.account.description}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.currentUser.user && state.currentUser.user.user,
	};
};

export default connect(mapStateToProps)(withRouter(UserCard));

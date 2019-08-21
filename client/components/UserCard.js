import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
class UserCard extends Component {
	constructor(props) {
		super(props);
	}

	handleFollow = ev => {
		const method = ev.target.name === 'follow' ? 'POST' : 'DELETE';
		const url = 'http://localhost:3000/api/v1//users/twitter/follow';
		const token = localStorage.getItem('jwt') || '';
		if (this.props.currentUser) {
			fetch(`${url}`, {
				method: method,
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: token
				},
				body: JSON.stringify({
					user: this.props.currentUser.user,
					account: this.props.account
				})
			})
				.then(res => res.json())
				.then(data => {
					this.props.dispatch({ type: 'UPDATE_USER_SUCCESS', data: data.user });
					this.props.handleFollow();
				});
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
		currentUser: state.currentUser.user
	};
};

export default connect(mapStateToProps)(withRouter(UserCard));

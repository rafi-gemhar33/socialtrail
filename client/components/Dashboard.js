import React from 'react';
import { connect } from 'react-redux';
import { log } from 'util';
import UserCard from './UserCard';

class Dashboard extends React.Component {
	state = {
		accounts: null,
		isLoading: false,
		isFollowing: true
	};
	componentDidMount() {
		this.populateFollowers();
	}
	populateFollowers(){
		if (this.props.userState) {
			fetch(
				`http://localhost:3000/api/v1/users/${this.props.userState.user._id}`
			)
				.then(res => res.json())
				.then(res => {
					if (res.success) {
						this.setState({ accounts: res.user.followingAccounts });
					}
				})
				.catch(err => console.log(err));
		}
	}
	handleFollow = () => {
		this.populateFollowers();
		const isFollowing =
			this.props.currentUser &&
			this.props.currentUser.user &&
			this.props.currentUser.user.followingAccounts.includes(
				this.state.account && this.state.account._id
			);
		// this.setState({ isFollowing });
	};
	render() {
		const { isFollowing, accounts } = this.state;
		return (
			<div>
				<div className="row">
					<div className="col s8 offset-s2">
						<div className="form-container row">
							{ accounts
								? accounts.map(account => {
										return (
											<UserCard
												account={account}
												isFollowing={isFollowing}
												handleFollow={this.handleFollow}
											/>
										);

								  })
									

								: null}
								{
									accounts && accounts.length < 1 ? <p>Currently you are not following any accounts</p> : null
								}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		userState: state.currentUser.user
	};
}

export default connect(mapStateToProps)(Dashboard);

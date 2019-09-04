import React from 'react';
import { connect } from 'react-redux';

class CurrentUser extends React.Component {
	render() {
		const { user } = this.props.user;
		return (
			<div className="avatar-box">
				{user && user.user ? (
						<p className="avatar">
							{user.user.userName ? user.user.userName[0] : ''}
						</p>

				) : null}
			</div>
		);
	}
}

function mapStateToProps(state) {
	// console.log(state, "nav map state");
	return {
		user: state.currentUser
	};
}

export default connect(mapStateToProps)(CurrentUser);

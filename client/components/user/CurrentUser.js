import React from 'react';
import { connect } from 'react-redux';

class CurrentUser extends React.Component {
	render() {
		const  user  = this.props.user;
		return (
			<div className="avatar-box">
				{user && (
					<p className="avatar">
						{user.userName ? user.userName[0] : ''}
					</p>
				) }
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.currentUser.user && state.currentUser.user.user
	};
}

export default connect(mapStateToProps)(CurrentUser);

import React from 'react';
import { connect } from 'react-redux';

class CurrentUser extends React.Component {
	render() {
		const { user } = this.props.user;
		return (
			<div
				style={{
					position: 'fixed',
					top: '8%',
					right: '1%',
					zIndex: '20',
					textAlign: 'center'
				}}
			>
				{user && user.user ? (
					<div>
						<p
							style={{
								color: 'red',
								background: 'black',
								borderRadius: '50%',
								fontSize: '2rem',
								padding: '0.5rem 1.5rem',
								marginBottom: '5px'
							}}
						>
							{user.user.userName ? user.user.userName[0] : ''}
						</p>
						<p
							style={{
								margin: 0,
								color: 'red',
								textAlign: 'center'
							}}
						>
							{user.user.userName ? user.user.userName : ''}
						</p>
					</div>
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

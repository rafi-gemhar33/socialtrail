import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends Component {
	handleLogout = () => {
		localStorage.clear();
		this.props.history.push('/login');
	};

	render() {
		const { isAuthInProgress } = this.props.user;
		// console.log(this.props.user.isAuthInProgress);
		return (
			<div className="navbar-box">
				<nav className="">
					<div className="nav-wrapper container">
						<Link to="/" className="brand-logo">
							Social Media Tracker
						</Link>
						<ul id="nav-mobile" className="right hide-on-med-and-down">
							{isAuthInProgress ? (
								<div>
									<li>
										<NavLink to="/" exact activeClassName="active" isActive={this.checkActive}>
											Home
										</NavLink>
									</li>
									<li>
										<NavLink to="/login" exact activeClassName="active" isActive={this.checkActive}>
											Login
										</NavLink>
									</li>
									<li>
										<NavLink to="/register" exact activeClassName="active" isActive={this.checkActive}>
											SignUp
										</NavLink>
									</li>
								</div>
							) : (
								<div>
									<li>
										<NavLink to="/" exact activeClassName="active" isActive={this.checkActive}>
											Home
										</NavLink>
									</li>
									<li>
										<a href="/" onClick={this.handleLogout}>
											Logout
										</a>
									</li>
								</div>
							)}
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.currentUser
	};
}

export default connect(mapStateToProps)(Navbar);

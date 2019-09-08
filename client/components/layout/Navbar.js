import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CurrentUser from '../user/CurrentUser';
import M from 'materialize-css';

class Navbar extends Component {
	componentDidMount() {
		// Auto initialize all the things!
		M.AutoInit();
	}
	handleLogout = () => {
		localStorage.clear();
		this.props.history.push('/login');
	};

	render() {
		const { isAuthInProgress } = this.props.user;
		return (
			<>
				<div className="navbar-box">
					<nav className="">
						<div className="nav-wrapper container">
							<Link to="/" className="brand-logo">
								Social Media Tracker
							</Link>
							<Link
								to="#"
								className="sidenav-trigger"
								dataTarget="mobile-links"
							>
								<i className="material-icons">menu</i>
							</Link>
							<ul id="nav-mobile" className="right hide-on-med-and-down">
								{isAuthInProgress ? (
									<div>
										<li>
											<NavLink
												to="/"
												exact
												activeClassName="active"
												isActive={this.checkActive}
											>
												Home
											</NavLink>
										</li>
										<li>
											<NavLink
												to="/login"
												exact
												activeClassName="active"
												isActive={this.checkActive}
											>
												Login
											</NavLink>
										</li>
										<li>
											<NavLink
												to="/register"
												exact
												activeClassName="active"
												isActive={this.checkActive}
											>
												SignUp
											</NavLink>
										</li>
									</div>
								) : (
									<div>
										<li>
											<NavLink
												to="/"
												exact
												activeClassName="active"
												isActive={this.checkActive}
											>
												Home
											</NavLink>
										</li>
										<li>
											<NavLink
												to="/dashboard"
												exact
												activeClassName="active"
												isActive={this.checkActive}
											>
												Dashboard
											</NavLink>
										</li>
										<li>
											<a href="/" onClick={this.handleLogout}>
												Logout
											</a>
										</li>
										<li>
											<Link to="/">
												<CurrentUser />
											</Link>
										</li>
									</div>
								)}
							</ul>
						</div>
					</nav>
				</div>
				<ul id="mobile-links" className="sidenav">
					{isAuthInProgress ? (
						<div>
							<li>
								<NavLink
									to="/"
									exact
									activeClassName="active"
									isActive={this.checkActive}
								>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/login"
									exact
									activeClassName="active"
									isActive={this.checkActive}
								>
									Login
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/register"
									exact
									activeClassName="active"
									isActive={this.checkActive}
								>
									SignUp
								</NavLink>
							</li>
						</div>
					) : (
						<div>
							<li>
								<NavLink
									to="/"
									exact
									activeClassName="active"
									isActive={this.checkActive}
								>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/dashboard"
									exact
									activeClassName="active"
									isActive={this.checkActive}
								>
									Dashboard
								</NavLink>
							</li>
							<li>
								<a href="/" onClick={this.handleLogout}>
									Logout
								</a>
							</li>
							<li>
								<Link to="/">
									<CurrentUser />
								</Link>
							</li>
						</div>
					)}
				</ul>
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.currentUser,
	};
}

export default connect(mapStateToProps)(Navbar);

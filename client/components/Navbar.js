import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';


class Navbar extends Component {

	handleLogout = () => {
		localStorage.clear()
		this.props.history.push('/login');
	}

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
						{
							isAuthInProgress ?
								<>
									<li>
										<Link to="/">Home</Link>
									</li>
									<li>
										<Link to="/login">Login</Link>
									</li>
									<li>
										<Link to="/register">SignUp</Link>
									</li>
								</>
							:
							<>
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<a href="/" onClick={this.handleLogout}>Logout</a>
								</li>
							</>
						}
					</ul>
				</div>
			</nav>
		</div>
	);
}
};

function mapStateToProps(state){
	// console.log(state, "nav map state");
	return {
		user : state.currentUser
	}
}

export default connect(mapStateToProps)(Navbar);

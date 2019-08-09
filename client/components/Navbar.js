import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeNav: "home"
		};
	}

	changeActive = activeNav => {
		this.setState({ activeNav });
	};
	logout = () => {
		localStorage.setItem("jwt", "");
		this.props.dispatch({ type: "LOG_OUT", data: null });
		this.setState({ activeNav: "home" });
	};
	render() {
		const { activeNav } = this.state;

		return (
			<div className="navbar-box">
				<nav className="">
					<div className="nav-wrapper container">
						<Link onClick={this.changeActive} to="/" className="brand-logo, logo">
							Social Media Tracker
						</Link>
						<ul id="nav-mobile" className="right hide-on-med-and-down">
							<li className={activeNav === "home" ? "active" : ""}>
								<NavLink onClick={() => this.changeActive("home")} to="/">
									Home
								</NavLink>
							</li>
							{!this.props.currentUser ? (
								<>
									<li className={activeNav === "login" ? "active" : ""}>
										<NavLink
											onClick={() => this.changeActive("login")}
											to={{
												pathname: "/login",
												navObj: {
													activeNav: this.changeActive
												}
											}}
										>
											Login
										</NavLink>
									</li>
									<li className={activeNav === "register" ? "active" : ""}>
										<NavLink
											onClick={() => this.changeActive("register")}
											to={{
												pathname: "/register",
												navObj: {
													activeNav: this.changeActive
												}
											}}
										>
											SignUp
										</NavLink>
									</li>
								</>
							) : (
								<>
									<li>
										<NavLink name="home" onClick={this.logout} to="/">
											Logout
										</NavLink>
									</li>
								</>
							)}
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

function mapStateToProps(state) {
	// console.log(state, "login mapStateToProps");
	return { currentUser: state.currentUser.user };
}

export default connect(mapStateToProps)(Navbar);

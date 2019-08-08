import React, { Component } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<div className="navbar-box">
			<nav className="">
				<div className="nav-wrapper container">
					<Link to="/" className="brand-logo">
						Social Media Tracker
					</Link>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/register">SignUp</Link>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;

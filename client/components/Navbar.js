import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

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
							<NavLink to="/">Home</NavLink>
						</li>
						<li>
							<NavLink to="/login">Login</NavLink>
						</li>
						<li>
							<NavLink to="/register">SignUp</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;

import React, { Component } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<div className="">
			<nav>
				<div class="nav-wrapper container">
					<Link to="/" class="brand-logo">
						Social Media Tracker
					</Link>
					<ul id="nav-mobile" class="right hide-on-med-and-down">
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

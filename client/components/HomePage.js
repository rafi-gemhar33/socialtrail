import React, { Component } from "react";
import { Link } from "react-router-dom";

import Login from "./Login";
import SearchUser from "./SearchUser";
import Canvas from "./Canvas";

const HomePage = () => {
	return (
		<div>
			<h1>Social Media Tracker</h1>

			<ul>
				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to="/register">SignUp</Link>
				</li>
			</ul>

			<SearchUser />
		</div>
	);
};

export default HomePage;

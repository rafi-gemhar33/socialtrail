import React, { Component } from 'react';
// import Login from './Login';
// import SignUp from './SignUp';
import { Link } from 'react-router-dom'; 

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
    </div>
  );
}

export default HomePage;
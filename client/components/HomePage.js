import React, { Component } from 'react';
import Login from './Login';
import SearchUser from "./SearchUser";

const HomePage = () => {
  return (
    <div>
    	<h1>Social Media Tracker</h1>
    	<Login />
      <SearchUser />
    </div>
  );
}

export default HomePage;


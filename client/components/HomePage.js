import React, { Component } from 'react';
import Login from './Login';
import SearchUser from "./SearchUser";
import Canvas from "./Canvas"

const HomePage = () => {
  return (
    <div>
    	<h1>Social Media Tracker</h1>
    	<Login />
      <SearchUser />
      <Canvas />
    </div>
  );
}

export default HomePage;


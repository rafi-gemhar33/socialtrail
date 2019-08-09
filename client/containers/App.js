import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import "../scss/index.scss";

import { getCurrentUser, noToken } from "../actions";

import Login from "../components/Login";
import SignUp from "../components/SignUp";
import HomePage from "../components/HomePage";
import Navbar from "../components/Navbar";

class App extends Component {
  state = { 
    token: ""
  }

  componentDidMount() {
    var token = localStorage.getItem('jwt') || '';
    if(token) {
      // this.setState({token: token})
      this.props.dispatch(getCurrentUser(token))
    } else {
      this.props.dispatch(noToken());
    }
  }

  render() {
    return (
			<div>
				<Navbar />
				<div className="">
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route path="/login" component={Login} />
						<Route path="/register" component={SignUp} />
						<Route render={() => <h1>404 Page not found</h1>} />
					</Switch>
				</div>
			</div>
    );
  }
}

const mapStateToProps = state => {
	return {
		currentUser: state.currentUser.user
	};
};

export default connect(mapStateToProps)(App);

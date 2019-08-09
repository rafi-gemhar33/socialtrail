import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
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
    // console.log(this.props.history)
    var token = localStorage.getItem('jwt') || '';
    if(token) {
      // this.setState({token: token})
      this.props.dispatch(getCurrentUser(token, this.props.history));
    } else {
      this.props.history.push('/login');
    }
  }

  render() {
    return (
			<div>
				<Navbar />
				<div className="container">
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
  // console.log(state.currentUser, "app map state");
	return {
		currentUser: state.currentUser.user
	};
};

export default withRouter(connect(mapStateToProps)(App));

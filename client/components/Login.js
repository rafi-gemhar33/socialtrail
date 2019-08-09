import React, { Component } from "react";
import { connect } from "react-redux";
import validateEmail from "../utils/validateEmail";

const url = "http://localhost:3000/api/v1/";

class Login extends Component {
	state = {
		user: {
			email: "",
			password: ""
		},
		error: ""
	};

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({
			user: {
				...this.state.user,
				[name]: value
			}
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const { email, password } = this.state.user;

		const isValidEmail = validateEmail(email);

    if(isValidEmail && password.length >= 6){
      fetch(`${url}users/login`,{
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.state.user)
      })
      .then(res => res.json())
      .then(data => {
        if(data.success){
					console.log(data);
					
          localStorage.setItem("jwt", data.token);
          this.props.dispatch({ type: "USER_LOGIN_SUCCESS", data: data });
          this.setState({ user: {} });
          this.props.history.push('/');
        }
      })
      .catch(err => {
        console.log(err,this, "catch error");
        this.setState({ error: "Wrong email address" });
        setTimeout(() => this.setState({ error: "" }), 1000);
      });
    } else if (!isValidEmail){
      this.setState({ error: "Invalid email address" });
    } else if (password.length < 6){
      this.setState({ error: "Password length is too short" });
    } else {
      this.setState({ error: "Please fill all the feilds" });
    }
  }

	render() {
		const { error } = this.state;
		return (
			<div className="row">
				<div className="col s8 offset-s2">
					<form className=" form-container">
						<p className={error}>{error}</p>
						<input
							type="text"
							name="email"
							placeholder="Email address"
							onChange={this.handleChange}
							value={this.state.user.email}
						/>
						<input
							type="password"
							name="password"
							placeholder="password"
							onChange={this.handleChange}
							value={this.state.user.password}
						/>
						<button
							className="  btn"
							onClick={this.handleSubmit}
						>
							Login
						</button>
					</form>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	// console.log(state, "login mapStateToProps");
	return { state };
}

export default connect(mapStateToProps)(Login);

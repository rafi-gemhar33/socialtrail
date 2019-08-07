import React, { Component } from 'react';
import axios from 'axios';

import validateEmail from '../utils/validateEmail';

console.log(validateEmail, "validateEmail SignUp");

class SignUp extends Component {
  state = {
    user: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ 
      user: {
        ...this.state.user,
        [name]: value
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { 
      userName,
      email,
      password,
      confirmPassword
    } = this.state.user;

    const isValidEmail = email.include('.com');

    console.log(isValidEmail, "check mail demo...");

    if(userName && email && isValidEmail && password.length >= 6 && confirmPassword.length >= 6){
      if(password === confirmPassword){
        fetch('http://localhost:3000/api/v1/users/register',{
          method: "POST",
          headers: {
            "Content-type", 'appliction/json'
          },
          body: JSON.stringify(this.state.user)
        })
        .then((res) => {
          console.log(res, "login data");
          if(res.data.success){
            localStorage.setItem("jwt", res.data.token);
            this.props.dispatch({ type: "USER_LOGIN_SUCCESS", data: res.data });
            this.setState({ user: {} });
            this.props.history.push('/');
          }
        })
        .catch(function (err) {
          console.log(err, "catch error");
          this.setState({ error: "Wrong email Address" });
          setTimeout(() => this.setState({ error: "" }), 1000);
        });
      } else {
        this.setState({ error: "Email did not match" });
      }
    } else {
      this.setState({ error: "Please fill all the feilds" });
    }
  }

  render() {
    return (
      <form>
        <input
          type="text"
          name="userName"
          placeholder="Username"
          onChange={ this.handleChange }
          value={ this.state.user.userName }
          />
        <input
          type="text"
          name="email"
          placeholder="Email address"
          onChange={ this.handleChange }
          value={ this.state.user.email }
          />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={ this.handleChange }
          value={ this.state.user.password }
          />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={ this.handleChange }
          value={ this.state.user.confirmPassword }
          />
        <button onSubmit={ this.handleSubmit }>
          SignUp
        </button>
      </form>
    );
  }
}

export default SignUp;

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class UserCard extends Component {
	constructor(props) {
		super(props);
	}
	handleFollow = ev => {
		const method = ev.target.name === "follow" ? "POST" : "DELETE";
		const url = "http://localhost:3000/api/v1//users/twitter/follow";
		const token = localStorage.getItem("jwt") || "";
		if (this.props.currentUser) {
			// console.log(this.props.currentUser.user);
			fetch(`${url}`, {
				method: method,
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: token
				}
			})
				.then(res => res.json())
				.then(data => console.log(data));
		} else {
			this.props.history.push("/login");
		}
	};
	render() {
		return (
			<div className="row">
				<div className="col s12 m12">
					<div className="card ">
						<div className="card-image">
							<img src={this.props.account.profile_banner_url} />
							<div className="dp-box">
								<img
									className="dp circle responsive-img"
									src={this.props.account.profile_image_url.replace(
										"normal",
										"400x400"
									)}
								/>
							</div>
						</div>

						<div className="card-content user-content">
							<span className="card-title activator grey-text text-darken-4">
								{this.props.account.name}
								<button
									className="btn right"
									onClick={this.handleFollow}
									name="follow"
								>
									Follow
									<i className="material-icons right">loyalty</i>
								</button>
								<button
									className="btn right"
									onClick={this.handleFollow}
									name="unfollow"
								>
									Unfollow
									<i className="material-icons right">block</i>
								</button>
							</span>
							<p>{this.props.account.description}</p>
						</div>
					</div>
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

export default connect(mapStateToProps)(withRouter(UserCard));

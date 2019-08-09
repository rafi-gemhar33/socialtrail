import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

const UserCard = props => {
	return (
		<div className="row">
			<div className="col s12 m12">
				<div className="card ">
					<div className="card-image">
						<img src={props.user.profile_banner_url} />
						<div className="dp-box">
							<img
								className="dp circle responsive-img"
								src={props.user.profile_image_url}
							/>
						</div>
					</div>

					<div className="card-content user-content">
						<span className="card-title activator grey-text text-darken-4">
							{props.user.name}
							<button class="btn waves-effect waves-light right">
								Follow
								<i class="material-icons right">loyalty</i>
							</button>
						</span>
						<p>{props.user.description}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserCard;

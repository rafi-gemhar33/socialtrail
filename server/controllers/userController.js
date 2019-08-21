const User = require('../models/User');
const jwtAuth = require('../utils/jwtAuth');
const bcrypt = require('bcrypt');

module.exports = {
	getUser: (req, res) => {
		User.findOne({ _id: req.params.id })
			.populate('followingAccounts')
			.exec((err, user) => {
				if (err) {
					return res
						.status(500)
						.json({ error: err, success: false, message: 'Server error' });
				} else if (user) {
					return res.status(200).json({ success: true, user });
				} else {
					return res.status(401).json({ error: err });
				}
			});
	},

	getAllUsers: (req, res) => {
		User.findOne({ _id: req.user.id }, (err, user) => {
			if (err) {
				return res
					.status(500)
					.json({ error: err, success: false, message: 'Server error' });
			} else if (user && user.isAdmin) {
				User.find({})
					.select('-password')
					.exec((err, users) => {
						if (err) {
							return res
								.status(500)
								.json({ error: err, success: false, message: 'Server error' });
						} else if (users) {
							return res.status(200).json({ success: true, users });
						}
					});
			} else if (!user.isAdmin) {
				return res
					.status(401)
					.json({ success: false, massage: 'unauthorized' });
			}
		});
	},

	verifyToken: (req, res) => {
		User.findOne({ _id: req.user.id })
			.select('-password')
			.exec((err, user) => {
				if (err) {
					return res
						.status(500)
						.json({ error: err, success: false, message: 'Server error' });
				} else if (user) {
					return res.status(200).json({ success: true, user });
				}
			});
	},

	login: (req, res) => {
		User.findOne({ email: req.body.email }, (err, user) => {
			if (err) {
				return res
					.status(500)
					.json({ error: err, success: false, message: 'Server error' });
			} else if (!user) {
				return res
					.status(400)
					.json({ success: false, message: "User does'nt exist" });
			} else if (user) {
				var isValidPassword = bcrypt.compareSync(
					req.body.password,
					user.password
				);
				var token = jwtAuth.signToken({ id: user._id }, process.env.JWT_SIGN);

				if (!isValidPassword) {
					res.status(401).json({ success: false, massage: 'Invalid pasword' });
				} else if (isValidPassword) {
					// var newUser = Object.keys(user).filter(v => !v === "password" );
					res.status(200).json({ success: true, user, token });
				}
			}
		});
	},

	signUp: (req, res) => {
		User.findOne({ email: req.body.email }, (err, user) => {
			if (err) {
				return res
					.status(500)
					.json({ error: err, success: false, message: 'Server error' });
			} else if (user) {
				return res
					.status(403)
					.json({ success: false, message: 'User alredy exist' });
			} else if (!user) {
				User.create(req.body, (err, user) => {
					if (err) {
						return res
							.status(500)
							.json({ success: false, message: 'Server error' });
					} else if (user) {
						return res
							.status(200)
							.json({ success: true, message: 'User registred sucessfully' });
					}
				});
			}
		});
	},

	updateUser: (req, res) => {
		User.findOneAndUpdate(
			{ _id: req.params.id },
			req.body,
			{ new: true },
			(err, user) => {
				if (err) {
					return res
						.status(500)
						.json({ error: err, success: false, message: 'Server error' });
				} else if (user) {
					return res
						.status(200)
						.json({ success: true, message: 'User updated succesfully' });
				}
			}
		);
	},

	deleteUser: (req, res) => {
		User.findOneAndDelete(
			{ _id: req.params.id },
			req.body,
			{ new: true },
			(err, user) => {
				if (err) {
					return res
						.status(500)
						.json({ error: err, success: false, message: 'Server error' });
				} else if (user) {
					return res
						.status(200)
						.json({ success: true, message: 'User deleted succesfully' });
				}
			}
		);
	},

	followTwiter: (req, res) => {
		User.findByIdAndUpdate(
			req.body.user._id,
			{ $push: { followingAccounts: req.body.account } },
			{ new: true },
			(err, updatedUser) => {
				if (err) {
					return res
						.status(500)
						.json({ error: err, success: false, message: 'Server error' });
				} else {
					res.status(200).json({ success: true, user: updatedUser });
				}
			}
		);
	},

	unFollowTwiter: (req, res) => {
		User.findByIdAndUpdate(
			req.body.user._id,
			{ $pull: { followingAccounts: req.body.account._id } },
			{ new: true },
			(err, updatedUser) => {
				if (err) {
					return res
						.status(500)
						.json({ error: err, success: false, message: 'Server error' });
				} else {
					res.status(200).json({ success: true, user: updatedUser });
				}
			}
		);
	}
};

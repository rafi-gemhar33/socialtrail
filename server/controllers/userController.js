const User = require('../models/User');
const jwtAuth = require('../utils/jwtAuth');
const bcrypt = require('bcrypt');

module.exports = {
	getUser: (req,res) => {
		console.log('rendered1');
		User.findOne({ _id: req.params.id }, (err, user) => {
			if(err){
				return res.status(500).json({ error: err, success: false, massege: "Server error" });
			} else if(user){
				return res.status(200).json({ success: true, user });
			}
		})
	},

	getAllUsers: (req,res) => {
		console.log(req.user);

		User.findOne({ _id: req.user.id }, (err, user) => {
			if(err){
				return res.status(500).json({ error: err, success: false, massege: "Server error" });
			} else if(user && user.isAdmin){
				User.find({}).select('-password').exec((err, users) => {
					if(err){
						return res.status(500).json({ error: err, success: false, massege: "Server error" });
					} else if(users){
						return res.status(200).json({ success: true, users });
					}
				})
			} else if(!user.isAdmin){
					return res.status(401).json({ success: false, massage: "unauthorized" });
			}
		})		
	},

	verifyToken: (req,res) => {
		User.findOne({ _id: req.user.id }).select('-password').exec((err, user) => {
			if(err){
				return res.status(500).json({ error: err, success: false, massege: "Server error" });
			} else if(user){
				return res.status(200).json({ success: true, user });
			}
		})
	},

	login: (req,res) => {
		console.log(req.body,'rendered login');
		User.findOne({ email: req.body.email }, (err,user) => {
			if(err){
				return res.status(500).json({ error: err, success: false, massege: "Server error" });
			} else if(!user){ 
				return res.status(400).json({ success: false, massege: "User does'nt exist" });
			} else if(user){
					var isValidPassword = bcrypt.compareSync(req.body.password, user.password);
					console.log(isValidPassword, "isValidPassword..");
					var token = jwtAuth.signToken({ id: user._id }, process.env.JWT_SIGN);
					
					if(!isValidPassword){
						console.log(req.body, "login data check4");

						res.status(401).json({ success: false, massage: "Invalid pasword" })
					} else if(isValidPassword){
						// var newUser = Object.keys(user).filter(v => !v === "password" );
						res.status(200).json({ success: true, user, token })
					}
			}
		})
	
	},

	signUp: (req,res) => {
		console.log(req.body,'rendered sign up');

		User.findOne({ email: req.body.email }, (err, user) => {
			if(err){
				return res.status(500).json({ error: err, success: false, massege: "Server error" });
			} else if(user){
				return res.status(403).json({ success: false, massege: "User alredy exist" });
			} else if(!user){
				User.create(req.body, (err, user) => {
					if(err){
						return res.status(500).json({ success: false, massege: "Server error" });
					}	else if(user){ 
						console.log(user,"check5");
						return res.status(200).json({ success: true, massege: "User registred sucessfully" });
					}
				})
			}
		})
	
	},

	updateUser: (req,res) => {
		console.log(req.params,'update user');
		User.findOneAndUpdate({ _id: req.params.id }, req.body, {new : true}, (err, user) => {
			if(err){
				return res.status(500).json({ error: err, success: false, massege: "Server error" });
			} else if(user){
				return res.status(200).json({ success: true, massege: "User updated succesfully" });
			}
		})
	},

	deleteUser: (req,res) => {
		console.log(req.params,'update user');
		User.findOneAndDelete({ _id: req.params.id }, req.body, {new : true}, (err, user) => {
			if(err){
				return res.status(500).json({ error: err, success: false, massege: "Server error" });
			} else if(user){
				return res.status(200).json({ success: true, massege: "User deleted succesfully" });
			}
		});
	},

}
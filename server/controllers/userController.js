const User = require('../models/User');
const jwtAuth = require('../utils/jwtAuth');

module.exports = {
	getUser: (req,res) => {
		console.log('rendered');
	},

	getAllUsers: (req,res) => {
		console.log('rendered');
	
	},

	login: (req,res) => {
		console.log(req.body,'rendered');
		User.findOne({ email: req.body.email }, (err,user) => {
			if(err){
				return res.status(500).json({ error: err, success: false, massege: "Server error" });
			} else if(!user){ 
				return res.status(400).json({ success: false, massege: "User does'nt exist" });
			} else if(user){
				const token = jwtAuth.signToken(user._id);
				return res.status(200).json({ success: true, user, token });
			}
		})
	
	},

	signUp: (req,res) => {
		console.log(req.body,'rendered');
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
						return res.status(200).json({ success: true, massege: "User registred sucessfully" });
					}
				})
			}
		})
	
	},

	updateUser: (req,res) => {
		console.log('rendered');
	},

	deleteUser: (req,res) => {
		console.log('rendered');
	},

}
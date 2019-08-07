const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const UserSchema = new Schema({
	name: {
		type: String,
	},
	userName: {
		type: String,
		unique: true,
		require: true
	},
	email: {
		type: String,
		unique: true,
		require: true
	},
	password: {
		type: String,
		require: true,
		min: 6,
		max: 20
	},

}, { timestamps: true });

UserSchema.pre('save', (next) => {
	if(this.password && this.isModified('password')){
		this.password = bcrypt.hashSync(this.password, salt);
		next();
	}
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
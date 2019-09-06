const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TwitterAccountSchema = new Schema(
	{
		id_str: {
			type: String
		},
		name: {
			type: String
		},
		screen_name: {
			type: String,
			unique: true,
			require: true
		},
		description: {
			type: String
		},
		location: {
			type: String
		},
		followers_count: [
			{
				type: Number
			}
		],
		friends_count: [
			{
				type: Number
			}
		],
		statuses_count: [
			{
				type: Number
			}
		],
		favourites_count: [
			{
				type: Number
			}
		],
		profile_banner_url: {
			type: String
		},
		profile_image_url: {
			type: String
		},
		maxid: {
			type: String
		}
	},
	{ timestamps: true }
);

const TwitterAccount = mongoose.model("TwitterAccount", TwitterAccountSchema);
module.exports = TwitterAccount;


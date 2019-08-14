const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TweetSchema = new Schema(
	{
		createdDate: {
			type: String
		},
		id_str: {
			type: String,
			unique: true,
			require: true
		},
		text: {
			type: String,
			unique: true,
			require: true
		},
		truncated: {
			type: Boolean
		},
		retweet_count: {
			type: Number
		},
		favorite_count: {
			type: Number
		}
	},
	{ timestamps: true }
);

const Tweet = mongoose.model("Tweet", TweetSchema);
module.exports = Tweet;

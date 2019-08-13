const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TweetSchema = new Schema(
	{
		createdDate: {
			type: String
		},
		tweetId: {
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
		retweets: {
			type: number
		},
		likes: {
			type: number
		}
	},
	{ timestamps: true }
);

const Tweet = mongoose.model("Tweet", TweetSchema);
module.exports = Tweet;

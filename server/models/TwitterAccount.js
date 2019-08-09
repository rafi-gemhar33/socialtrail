const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TwitterAccountSchema = new Schema(
	{
		accountId: {
			type: String
		},
		name: {
			type: String
		},
		screenName: {
			type: String,
			unique: true,
			require: true
		},
		followersPerday: [
			{
				type: Number
			}
		],
		tweets: [
			{
				type: Schema.Types.ObjectId,
				ref: "Tweet",
			}
		],
		maxid: {
			type: String
		}
	},
	{ timestamps: true }
);

const TwitterAccount = mongoose.model("TwitterAccount", TwitterAccountSchema);
module.exports = TwitterAccount;

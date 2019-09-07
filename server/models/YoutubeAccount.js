const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const YoutubeAccountSchema = new Schema(
	{
		id_str: {
			type: String,
			unique: true,
			require: true,
		},
		title: {
			type: String,
			unique: true,
			require: true,
    },
    searchName : {
      type: String,
      // require: true,
    },
		description: {
			type: String,
		},
		location: {
			type: String,
		},
		viewCount: [
			{
				type: Number,
			},
		],
		subscriberCount: [
			{
				type: Number,
			},
		],
		videoCount: [
			{
				type: Number,
			},
		],
		bannerImageUrl: {
			type: String,
		},
		profileImageUrl: {
			type: String,
		},
	},
	{ timestamps: true }
);

const YoutubeAccount = mongoose.model('YoutubeAccount', YoutubeAccountSchema);
module.exports = YoutubeAccount;

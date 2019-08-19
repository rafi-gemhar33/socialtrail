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
		// tweets: [
		// 	{
		// 		type: Schema.Types.ObjectId,
		// 		ref: "Tweet"
		// 	}
		// ],
		maxid: {
			type: String
		}
	},
	{ timestamps: true }
);

const TwitterAccount = mongoose.model("TwitterAccount", TwitterAccountSchema);
module.exports = TwitterAccount;

// "id_str": "491821358",
// "name": "Emma Wedekind 🐞",
// "screen_name": "EmmaWedekind",
// "location": "Karlsruhe, Germany",
// "description": "Software Engineer | Design Systems ▪️ American in Germany ▪️ Building @logmein @codingcoach_io ▪️ Instructor @eggheadio ▪️ Podcasting @ladybugpodcast @jspartyFM",

// "followers_count": 63152,
// "friends_count": 864,
// "listed_count": 553,

// "favourites_count": 29208,
// "profile_image_url": "https://pbs.twimg.com/profile_images/1160342217837436928/VR_zqvk1_400x400.jpg",

// "profile_banner_url": "https://pbs.twimg.com/profile_banners/813333008/1434927146/1500x500",

const TwiterAccount = require("../models/TwitterAccount");

const Twitter = require("twitter");

const client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

module.exports = {
	getAccount: (req, res) => {
		TwiterAccount.findOne(
			{ screen_name: req.body.username },
			(err, account) => {
				if (err) {
					return res
						.status(500)
						.json({ error: err, success: false, massege: "Server error",account: {} });
				} else if (account) {
					return res
						.status(200)
						.json({
							success: true,
							massege: "Accont info from DB",
							account: account
						});
				} else if (!account) {
					const params = {
						screen_name: req.body.username || ""
					};
					client.get("users/show.json", params, function(
						error,
						accountDetails,
						response
					) {
						if (!error) {

							const {
								id_str,
								name,
								screen_name,
								location,
								description,
								followers_count,
								friends_count,
								favourites_count,
								statuses_count,
								profile_image_url,
								profile_banner_url
							} = accountDetails;

							const account = {
								id_str,
								name,
								screen_name,
								location,
								description,
								profile_banner_url
							};
							account.followers_count = [followers_count];
							account.friends_count = [friends_count];
							account.favourites_count = [favourites_count];
							account.statuses_count = [statuses_count];
							account.profile_image_url = profile_image_url.replace(
								"normal",
								"400x400"
              );
              
              

							TwiterAccount.create(account, (err, newAccount) => {
								if (err) {
									return res
										.status(500)
										.json({ success: false, massege: "Server error" });
								} else if (newAccount) {

									return res.status(200).json({
										success: true,
										massege: "Account registred sucessfully",
										account: newAccount
									});
								}
							});
							// res.json({
							// 	success: true,
							// 	account: account
							// });
						} else {
							console.log("error", error);
							res.json({
								success: false
							});
						}
					});
				}
			}
		);
	},

	getAllTweets: (req, res) => {
          const params = {
            screen_name: req.body.username || "",
            count: 200,
            include_rts:false,
            // trim_user: true
            // max_id:1157349134279557125,
            // exclude_replies:true,
          };
          client.get("statuses/user_timeline", params, function(
            error,
            tweets,
            response
          ) {
            if (!error) {
                return res.status(200).json({
                  success: true,
                  massege: "live tweets fetch",
                  tweets: tweets
                });
            } else {
              console.log("error", error);
              return res.status(403).json({
                success: false,
                massege: "No user found",
                tweets: []
              });
            }
          });
	},

	followTwiter: (req, res) => {
		res.json({ route: "twitter-follow" });
	},

	unFollowTwiter: (req, res) => {
		res.json({ route: "twitter-unFollow" });
	}
};

const TwiterAccount = require("../models/TwitterAccount");

const Twitter = require("twitter");

const client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

module.exports = {
	updateAccount: (req, res) => {
		TwiterAccount.find({}, (err, accounts) => {
			if (err) {
				return res.status(500).json({
					error: err,
					success: false,
					massege: "Server error",
					account: {}
				});
			} else if (accounts) {

				var i = 0; //  set your counter to 1

				function myLoop() {
					//  create a loop function
					setTimeout(function() {
						//Updating the count every day

						const params = {
							screen_name: accounts[i].screen_name || ""
						};
						client.get("users/show.json", params, function(
							error,
							accountDetails,
							response
						) {
							if (!error) {
								const {
									screen_name,
									followers_count,
									friends_count,
									favourites_count,
									statuses_count
								} = accountDetails;

								TwiterAccount.updateOne(
									{ screen_name: screen_name },
									{
										$push: {
											followers_count: followers_count,
                      friends_count: friends_count,
                      favourites_count: favourites_count,
                      statuses_count: statuses_count
										}
									},
									(err, updatedAccount) => {
										if (err) {
											console.log(
												"error ***********************",
												err,
												updatedAccount
											);
											return res
												.status(500)
												.json({ success: false, massege: "Server error" });
										} else if (updatedAccount) {
											// console.log(
                      //   updatedAccount,
                      //   updatedAccount,
											// 	"###Updated###"
											// );
										}
									}
								);
							} else {
								console.log("error", tweets);
								res.json({
									success: false
								});
							}
						});

						i++;
						if (i < accounts.length) {
							myLoop();
						}
					}, 1000);
				}
				myLoop();
			}
		});
	}
};

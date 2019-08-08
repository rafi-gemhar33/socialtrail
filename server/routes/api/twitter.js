const express = require("express");
const router = express.Router();

const Twitter = require("twitter");
const twitterSecret = require("../../config/twitterSecret");

/* GET home page. */
router.post("/", function(req, res, next) {
	
	const client = new Twitter({
		consumer_key: twitterSecret.TWITTER_CONSUMER_KEY,
		consumer_secret: twitterSecret.TWITTER_CONSUMER_SECRET,
		access_token_key: twitterSecret.TWITTER_ACCESS_TOKEN_KEY,
		access_token_secret: twitterSecret.TWITTER_ACCESS_TOKEN_SECRET
  });

	const params = {   screen_name: req.body.username || "",
    count:200,
    // include_rts:false,
    // trim_user:true,
    // max_id:1157349134279557125,
    // exclude_replies:true,
	 };
	client.get("statuses/user_timeline", params, function(
		error,
		tweets,
		response
	) {
		if (!error) {
			res.json({
				success: true,
				tweets: tweets,
			});
		} else {
			console.log("error", tweets);
			res.json({
				success: false,
			});
		}
	});
});

module.exports = router;

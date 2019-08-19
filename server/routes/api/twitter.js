const express = require("express");
const router = express.Router();
const Twitter = require("twitter");

const twitterController = require("../../controllers/twitterController.js");

const client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
/* GET home page. */
router.post("/tweets", twitterController.getAllTweets);

router.post("/account", twitterController.getAccount);

module.exports = router;

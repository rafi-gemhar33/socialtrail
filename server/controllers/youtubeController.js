// const TwiterAccount = require("../models/TwitterAccount");
const fetch = require('node-fetch');
const YTkey = process.env.YT_ACCESS_KEY;

module.exports = {
	getChannelDetails: (req, res) => {
		fetch(
			`https://www.googleapis.com/youtube/v3/channels?part=brandingSettings%2Csnippet%2Cstatistics&forUsername=${req.params.username}&maxResults=5&key=${YTkey}`
		)
			.then(data => data.json())
			.then(account => {
				console.log('**************json Data***************\n', account);

				if (!account.error) {
					res.json({
						success: true,
						massege: 'Account registred sucessfully',
						account: account.items[0],
					});
				} else {
					res.json({
						success: false,
						massege: 'Error in fetching',
						error: account.error,
					});
				}
			})
			.catch(error => {
				res.json({
					success: false,
					massege: 'Error in fetching',
					error: error,
				});
			});
	},

	getsearchList: (req, res) => {
		console.log('**************', req.params.id);

		fetch(
			`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${req.params.id}&maxResults=50&key=${YTkey}`
		)
			.then(response => response.json())
			.then(videos => {
				let videoIdList = [];
				if (!videos.error) {
					videos.items.forEach(item => {
						videoIdList.push(item.id.videoId);
					});
					let videoIdListStr = videoIdList.join();

					fetch(
						`https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${videoIdListStr}&key=${YTkey}`
					)
						.then(response => response.json())
						.then(data => {
							if (!data.error) {
								console.log('**************json Data***************\n', data);
								res.json({
									success: true,
									massege: 'successful search attempt',
									data,
								});
							} else {
								res.json({
									success: false,
									massege: 'Error in fetching',
									error: error,
								});
							}
						});
				} else {
					res.json({
						success: false,
						massege: 'Error in fetching',
						error: error,
					});
				}
			})
			.catch(error => {
				res.json({
					success: false,
					massege: 'Error in fetching',
					error,
				});
			});
	},

	followYtube: (req, res) => {
		res.json({ route: 'twitter-follow' });
	},

	unFollowYtube: (req, res) => {
		res.json({ route: 'twitter-unFollow' });
	},
};

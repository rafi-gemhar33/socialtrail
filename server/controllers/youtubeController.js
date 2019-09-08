const fetch = require('node-fetch');
const YoutubeAccount = require('../models/YoutubeAccount');

const YTkey = process.env.YT_ACCESS_KEY;

module.exports = {
	getChannelDetails: (req, res) => {
		YoutubeAccount.findOne(
			{ searchName: req.params.username },
			(err, account) => {
				if (err) {
					return res.status(500).json({
						error: err,
						success: false,
						massege: 'Server error 1',
						account: {},
					});
				} else if (account) {
					return res.status(200).json({
						success: true,
						massege: 'Accont info from DB',
						account: account,
					});
				} else {
					fetch(
						`https://www.googleapis.com/youtube/v3/channels?part=brandingSettings%2Csnippet%2Cstatistics&forUsername=${req.params.username}&maxResults=5&key=${YTkey}`
					)
						.then(data => data.json())
						.then(account => {
							if (!account.error && account.items[0]) {

								const {
									id,
									snippet: { title, description, thumbnails, country },
									statistics: { viewCount, subscriberCount, videoCount },
									brandingSettings: { image },
								} = account.items[0];

								let accontObj = {
									id_str: id,
									title: title,
									searchName: req.params.username,
									description: description,
									location: country,
									viewCount: [viewCount],
									subscriberCount: [subscriberCount],
									videoCount: [videoCount],
									bannerImageUrl: image.bannerTabletExtraHdImageUrl,
									profileImageUrl: thumbnails.high.url,
								};

								console.log('@@@@@@@@@@', accontObj);

								YoutubeAccount.create(accontObj, (err, newAccount) => {
									console.log(err);

									if (err) {
										return res.status(500).json({
											error: err,
											success: false,
											massege: 'Server error 2',
										});
									} else if (newAccount) {
										res.status(200).json({
											success: true,
											massege: 'Account registred sucessfully',
											account: newAccount,
										});
									} else {
										return res.status(500).json({
											success: false,
											massege: 'Error in fetching from DB after creating',
											error: account.error,
										});
									}
								});
							} else {
								return res.status(500).json({
									success: false,
									massege: 'Error in fetching from Youtube API',
									error: account.error,
								});
							}
						})
						.catch(error => {
							return res.status(500).json({
								success: false,
								massege: 'caught error in fetching',
								error: error,
							});
						});
				}
			}
		);
	},

	getsearchList: (req, res) => {
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
							if (!data.error && data.items) {
								return res.status(200).json({
									success: true,
									massege: 'successful search attempt',
									items: data.items,
								});
							} else {
								return res.status(500).json({
									success: false,
									massege: 'Error in fetching',
									error: error,
								});
							}
						});
				} else {
					return res.status(500).json({
						success: false,
						massege: 'Error in fetching',
						error: error,
					});
				}
			})
			.catch(error => {
				return res.status(500).json({
					success: false,
					massege: 'Error in fetching',
					error,
				});
			});
	},
};

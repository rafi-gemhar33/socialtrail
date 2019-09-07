User Model:
    name: {
      type: String,
    },
    userName: {
      type: String,
      unique: true,
      require: true
    },
    email: {
      type: String,
      unique: true,
      require: true
    },
    password: {
      type: String,
      require: true,
      min: 6,
      max: 20
    },
    followingAccounts: [{
      type: Object,
      refpath: [TwitterAccount, InstaAccount],
      max: 5
    }]
    --------------------------------------------------------------------------------------------------

<!-- 
Account Model:
	InstaAccount: {
		type: Object,
		href: InstaAccount
	},

  TwitterAccount: {
		type: Object,
		href: TwitterAccount
	}, -->

------------------------------------------------------------------------------------------------------

TwitterAccount Model:
    AccountId: {
        type: String,
      },
    name: {
        type: String,
      },
    screenName: {
      type: String,
      unique: true,
      require: true
    },
    FollowersPerday: [{
      type: Object{date: count},
      max: 180,
    }],
    Tweets: [{
      type: Object,
      href: Tweet,
      max: 5
    }],
      maxid: {
      type: String,
    },
--------------------------------------------------------------------------------------------------------

YoutubeAccountSchema :

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
      require: true,
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

--------------------------------------------------------------------------------------------------------

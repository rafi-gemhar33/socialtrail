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
    FollowingAccounts: [{
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
Tweet Model:

    date: {
      type: String,
    },
    tweetId: {
      type: String,
      unique: true,
      require: true
    },
    text: {
      type: String,
      unique: true,
      require: true
    },
    truncated: {
      type: Boolean,
    },
    Retweets: {
      type: number,
    },
    likes: {
      type: number,
    },
--------------------------------------------------------------------------------------------------------

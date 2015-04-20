var fs = require('fs'),
    last_tweet_id = "1",
    tweets;


//Callback functions
var error = function (err, response, body) {
    console.log('ERROR [%s]', JSON.stringify(err));
};

var success = function (data) {
    tweet = data ? JSON.parse(data) : [];
    return_arr = [];

    for (var i = tweet.length - 1; i >= 0; i--) {
        return_arr = return_arr.concat({
            tweet_id  : tweet[i].id_str,
            timestamp : (new Date(tweet[i].created_at).getTime()/1000)
        });
    };

    fs.appendFile("tweets_astrosam.json", JSON.stringify(return_arr), function(err) {
        if(err) {
            return console.log(err);
        }
    });
};

var Twitter = require('twitter-js-client').Twitter;

//Use my Twitter Apps auth (hidden b/c private)
var config = {
    "consumerKey": "",
    "consumerSecret": "",
    "accessToken": "",
    "accessTokenSecret": "",
    "callBackUrl": "None"
};

var twitter = new Twitter(config);

// Get list of all tweets from @AstroSamantha
twitter.getUserTimeline({screen_name : "AstroSamantha"}, error, success);

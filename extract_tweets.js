var fs = require('fs'),
    last_tweet_id = "1", // Must manually change every time we run it
    tweets;


//Callback functions
var error = function (err, response, body) {
    console.log('ERROR [%s]', JSON.stringify(err));
};

var success = function (data) {
    tweet = data ? JSON.parse(data) : [];
    return_arr = [];

    console.log("there are " + tweet.length + " tweets.");

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

//Use my Twitter Apps auth
var config = {
    "consumerKey": "n4g8pSraLq13F6a0BcdbR26bK",
    "consumerSecret": "4O6TOxk4FcWhTJLeF0xoKI2xWgo1FoMwTfjl2DuTXj0d4T617H",
    "accessToken": "3165474142-mjhfQab06GUpAbQ8cfFVl8MQNmPyXgkoocvCoZf",
    "accessTokenSecret": "B0fxlq9avgd7akMQuDjd2Q9qixBI3SkE2GQbDq6b8OARV",
    "callBackUrl": "None"
};

var twitter = new Twitter(config);

// Get list of all tweets from @AstroSamantha
twitter.getUserTimeline({screen_name : "AstroSamantha", count : "200", max_id: last_tweet_id}, error, success);    

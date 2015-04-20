var fs = require('fs');

//Callback functions
var error = function (err, response, body) {
    console.log('ERROR [%s]', JSON.stringify(err));
};

var success = function (data) {

    tweet = data ? JSON.parse(data) : [];

    return_obj = {
        html : tweet.html,
        tweet_id  : /[^/]*$/.exec(tweet.url)[0]
    };

    console.log(return_obj);

    fs.appendFile("embedded_tweets.json", JSON.stringify(return_obj) + ',', function(err) {
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

var tweets = JSON.parse(fs.readFileSync('tweets_astrosam.json', 'utf8'));


// write to file helper
for (var i = tweets.length - 1; i >= 0; i--) {
    // For each of @AstroSamantha's tweets, pull the html for embedding
    twitter.getCustomApiCall('/statuses/oembed.json',{id: tweets[i].tweet_id}, error, success);
}

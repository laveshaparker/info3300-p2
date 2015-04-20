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

var i = 0;

var callOembed = function () {
    // For each of @AstroSamantha's tweets, pull the html for embedding
    twitter.getCustomApiCall('/statuses/oembed.json',{id: tweets[i].tweet_id}, error, success);

    i++;
    if (i % 180 === 0 && i < tweets.length - 1) {
        // We are about to hit our rate limit. We should pause for 15 minutes.
        setTimeout(
            callOembed,
            2000
        );
    } else {
        callOembed();
    }
}

var Twitter = require('twitter-js-client').Twitter;

//Use my Twitter Apps auth
var config = {
    "consumerKey": "",
    "consumerSecret": "",
    "accessToken": "",
    "accessTokenSecret": "",
    "callBackUrl": "None"
};

var twitter = new Twitter(config);

var tweets = JSON.parse(fs.readFileSync('tweets_astrosam.json', 'utf8'));

callOembed();

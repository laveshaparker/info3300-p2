var fs = require('fs');
var tweets = JSON.parse(fs.readFileSync('relevant_tweets_coords.json', 'utf8'));
// var orbits = JSON.parse(fs.readFileSync('friends-in-space-data/fisOrbits.json', 'utf8'))
// console.log(tweets.length);



fs.appendFile("test_tweets.json", '[', function(err) {
    if(err) {
        return console.log(err);
    }
});
tweets.forEach(function(tweet) {
    if (1420070400000 <= parseInt(tweet.timestamp) && parseInt(tweet.timestamp) <= 1420156799000) {

            toAppend = JSON.stringify(tweet) + ',';
            fs.appendFile("test_tweets.json", toAppend, function(err) {
                if(err) {
                    return console.log(err);
                }
            });
    }
});

fs.appendFile("test_tweets.json", ']', function(err) {
    if(err) {
        return console.log(err);
    }
});

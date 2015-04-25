var fs = require('fs');
var tweets = JSON.parse(fs.readFileSync('relevant_tweets.json', 'utf8'));
var orbits = JSON.parse(fs.readFileSync('friends-in-space-data/fisOrbits.json', 'utf8'))
// console.log(tweets.length);

function findClosestCoordinates(tweet) {
    var v;
    for (var i = 0; i <= orbits.length - 1; i++) {
        day = orbits[i].orbit;
        for (var j = 0; j < day.timestamps.length; j++) {
            timestamp = day.timestamps[j]; // cast to miliseconds
            if (!v && tweet.timestamp >= timestamp) {
                v = day.coordinates[j - 1];
            }
        }
    }; 
    return v; 
}

fs.appendFile("relevant_tweets_coords.json", '[', function(err) {
    if(err) {
        return console.log(err);
    }
});
tweets.forEach(function(tweet) {
    if (parseInt(tweet.timestamp) >= 1416718800) {
        tweet.timestamp = tweet.timestamp;
        tweet.coordinates = findClosestCoordinates(tweet);
        if (tweet.coordinates) {
            toAppend = JSON.stringify(tweet) + ',';
            fs.appendFile("relevant_tweets_coords.json", toAppend, function(err) {
                if(err) {
                    return console.log(err);
                }
            });
        }
    }
});

fs.appendFile("relevant_tweets_coords.json", ']', function(err) {
    if(err) {
        return console.log(err);
    }
});

var find_corresponding_embedded_html = function(id, embedded_tweets) {
    var embedded_html = "";
    for (var i = embedded_tweets.length - 1; i >= 0; i--) {
        if (embedded_tweets[i].tweet_id === id) {
            return embedded_tweets[i].html;  
        }
    };
    return null;
}

var fs = require('fs');

var timestamps = JSON.parse(fs.readFileSync('tweets_astrosam.json', 'utf8'));
var embedded = JSON.parse(fs.readFileSync('embedded_tweets.json', 'utf8'));

for (var i = timestamps.length - 1; i >= 0; i--) {
    embedded_html = find_corresponding_embedded_html(timestamps[i].tweet_id, embedded);        

    if (embedded_html) {
        tweet_info = {
            id : timestamps[i].tweet_id,
            timestamp : timestamps[i].timestamp,
            html : embedded_html
        };

        fs.appendFile("tweets_timestamps_html.json", JSON.stringify(tweet_info) + ",", function(err) {
            if(err) {
                return console.log(err);
            }
        });
    }
};

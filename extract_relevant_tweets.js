var fs = require('fs');
// var tweets = JSON.parse(fs.readFileSync('tweets_timestamps_html.json', 'utf8'));
var tweets = JSON.parse(fs.readFileSync('relevant_tweets.json', 'utf8'));
console.log(tweets.length);
// fs.appendFile("relevant_tweets.json", '[', function(err) {
//     if(err) {
//         return console.log(err);
//     }
// });
// tweets.forEach(function(tweet) {
//     if (parseInt(tweet.timestamp) >= 1416718800) {
//         tweet.timestamp = tweet.timestamp * 1000;
//         toAppend = JSON.stringify(tweet) + ',';
//         fs.appendFile("relevant_tweets.json", toAppend, function(err) {
//             if(err) {
//                 return console.log(err);
//             }
//         });
//     }
// });

// fs.appendFile("relevant_tweets.json", ']', function(err) {
//     if(err) {
//         return console.log(err);
//     }
// });
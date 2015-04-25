var tweets; 
d3.json("relevant_tweets.json", function (data) { 
  tweets = data;
});

function findClosestCoordinates(tweet) {
   
    var v;
    for (var i = orbitData.length - 1; i >= 0; i--) {
        var day = orbitData[i].orbit;
        // for (var j = day.timestamps.length - 1; j >= 0; j--) {
            
        for (var j = day.timestamps.length; j>=0; j--) {
            // console.log(j);
            // console.log(day.timestamps[j]);
            timestamp = day.timestamps[j];
            console.log(i);
            // cast to miliseconds
            // console.log("tweet: " + tweet.timestamp + " timestamp: " + timestamp);
            if (!v && (tweet.timestamp >= (timestamp + 18000000))) {
                timestamp += 18000000;
                console.log(tweet.timestamp + " " + timestamp);
                v = day.coordinates[j + 1];
                return v;
                
            }
        }
       
    }; 
  return v;
    
}


tweets.forEach(function(tweet) {
    if (parseInt(tweet.timestamp) >= 1426556017000) {
        tweet.timestamp = tweet.timestamp;
        tweet.coordinates = findClosestCoordinates(tweet);
        console.log(tweet.timestamp);
        if (tweet.coordinates) {
            
            toAppend = JSON.stringify(tweet) + ',';
            console.log(toAppend);
        }
    }
});

fs.appendFile("relevant_tweets_coords.json", ']', function(err) {
    if(err) {
        return console.log(err);
    }
});

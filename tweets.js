function TweetHandler(tweets, current, midnight_day_of) {
    return {
        tweets : tweets,

        current : current,

        // Tweet[], The tweets currently on the map
        active : [],

        // Retrieves the tweets from midnight on a given day to the 
        // current timestamp of the slider
        serveTweets : function() {
            // Serves the last tweet that was before or at a given timestamp.
            // Called on change of var current.
            for (var i = this.tweets.length - 1; i >= 0; i--) {
                if (midnight_day_of <= this.tweets[i].timestamp && this.tweets[i].timestamp <= this.current.date) {
                    tweet = Tweet(this.tweets[i], current);
                    this.active.push(tweet);
                }

                // Stop searching once we are looking further than the current timestamp.
                if (this.tweets[i].timestamp > this.current.date) {
                    this.plotTweets();
                    break;
                }
            }
        },

        // Plot all of the "active" tweets
        plotTweets : function() {
            this.active.forEach(function(tweet) {
                tweet.plotTweet(svg);
            });
        },
    }
}

function Tweet(tweet, current, map) {
    return {
        id          : tweet.id,
        timestamp   : tweet.timestamp,
        html        : tweet.html,
        coordinates : current.coords,
        plotTweet   : function(map) {
            map.append("circle") //test circle for selecting point
            // TODO: Gotta fix
                   .attr("cx", projection(this.coordinates)[0]) //x-longitude
                   .attr("cy", projection(this.coordinates)[1]) //y-latitude
                   .attr("r", 4)
                   .attr("class", "curCircle")
                   .attr("style", "stroke: pink; stroke-width: 8; fill: #000000");
        },
    }
}

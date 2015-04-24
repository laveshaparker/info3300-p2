function checkForEntry(tweet, active) {
    active.forEach(function(active_tweet) {
        if (active_tweet.id === tweet.id) {
            return true;
        }
    });
    return false;
}

function TweetHandler(tweets) {
    return {
        tweets : tweets,

        // Tweet[], The tweets currently on the map
        active : [],

        // Retrieves the tweets from midnight on a given day to the 
        // current timestamp of the slider
        serveTweets : function(current, midnight_day_of) {
            // Serves the last tweet that was before or at a given timestamp.
            // Called on change of var current.
            active = this.active;
            this.tweets.forEach(function(tweet) {
                if (midnight_day_of <= tweet.timestamp && tweet.timestamp <= Date.parse(current.date)) {
                    if (!checkForEntry(tweet, active)) {
                        t = Tweet(tweet);
                        this.active.push(t);
                    }
                }
            });
        },

        // Plot all of the "active" tweets
        plotTweets : function() {
            this.active.forEach(function(tweet) {
                tweet.plotTweet(svg);
            });
        },
    }
}

function Tweet(tweet, map) {
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
                   .attr("style", "stroke: red; stroke-width: 8; fill: #000000");
        },
    }
}

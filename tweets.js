function checkForEntry(tweet, active) {
    active.forEach(function(active_tweet) {
        if (active_tweet.id === tweet.id) {
            console.log("duplicate");
            return true;
        }
    });
    return false;
}
 
function TweetHandler(tweets) {
    function setTweets() {
        returnArr = [];
        tweets.forEach(function(tweet) {
            returnArr.push(Tweet(tweet));
        });
        return returnArr;
    }
    return {
        tweets : setTweets(),
 
        // Tweet[], The tweets currently on the map
        active : [],
 
        // Retrieves the tweets from midnight on a given day to the 
        // current timestamp of the slider
        serveTweets : function(current) {
            // Serves the last tweet that was before or at a given timestamp.
            // Called on change of var current.
            active = this.active;
            this.tweets.forEach(function(tweet) {
                // console.log("Date.parse(current.date): " + Date.parse(current.date) + " tweet.timestamp " + tweet.timestamp);
                // console.log("Date.parse(day.date)    : " + Date.parse(day.date) + " tweet.timestamp " + tweet.timestamp);

                if (Date.parse(day.date) <= tweet.timestamp && tweet.timestamp <= Date.parse(current.date)) {
                    // console.log(true);
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

        // Remove all active tweets from view
        removeTweets : function() {
            this.active.forEach(function(tweet) {
                tweet.hideTweet();
                tweet.hideTweetCircle();
            });
            this.active = [];
        },
    }
}
 
function Tweet(tweet, map) {
    return {
        id          : tweet.id,
        timestamp   : tweet.timestamp,
        html        : tweet.html,
        coordinates : tweet.coordinates,
        plotTweet   : function(map) {
            this.hideTweet();

            document.getElementById("displayTweet").innerHTML = this.html;

            twttr.widgets.load();
            
            // _this = this;
            // map.append("svg:circle")
            //    .attr("cx", projection(_this.coordinates)[0]) //x-longitude
            //    .attr("cy", projection(_this.coordinates)[1]) //y-latitude
            //    .attr("r", 4) 
            //    .attr("class", "tweetCircle")
            //    .attr("id", _this.id)
            //    .attr("style", "stroke: #4099FF; stroke-width: 8; fill: #4099FF")
            //    .on("click", function() {_this.showTweet()});
        },

        showTweet : function() {
            // Need to add a preloader icon
            this.hideTweet();
            document.getElementById("displayTweet").innerHTML = this.html;
            twttr.widgets.load();
        },

        hideTweet : function() {
            document.getElementById("displayTweet").innerHTML = "";
        },

        hideTweetCircle : function() {
            document.getElementById(this.id).remove();
        },
    }
}

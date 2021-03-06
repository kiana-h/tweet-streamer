const Twit = require("twit");
const path = require("path");
const fs = require("fs");

const tweetFormatter = require("../helpers/tweet_formatter");
const DbTweetManager = require("./db_tweet_manager");
const dbTweetManager = new DbTweetManager();

module.exports = (io) => {
  const T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_AUTH_KEY,
    access_token_secret: process.env.TWITTER_AUTH_SECRET,
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    strictSSL: true, // optional - requires SSL certificates to be valid.
  });

  const usa = ["-124.848974", "24.396308", "-66.885444", "49.384358"];
  const world = ["-180", "-90", "180", "90"];

  const stream = T.stream("statuses/filter", {
    locations: world,
  });

  // const stream = T.stream("statuses/filter", { track: "covid" });

  stream.on("tweet", (tweet) => {
    const formattedTweet = tweetFormatter(tweet);
    if (formattedTweet) {
      io.emit("tweet", formattedTweet);
      dbTweetManager.addTweetToQueue(formattedTweet);
    }
  });
};

const models = require("../models");

class DbTweetManager {
  constructor() {
    this.tweetQueue = [];
    this.maxQueueLength = 100;
  }

  async addTweetToQueue(tweet) {
    this.tweetQueue.push(tweet);
    if (this.tweetQueue.length >= this.maxQueueLength) {
      try {
        await this.insertTweets();
        console.log("tweets inserted");
      } catch (err) {
        console.log(err);
      }
    }
  }

  async insertTweets() {
    const tweetsToCreate = [...this.tweetQueue];
    this.clearTweets();
    await models.Tweet.bulkCreate(tweetsToCreate);
  }

  clearTweets() {
    this.tweetQueue.length = 0;
  }
}

module.exports = DbTweetManager;

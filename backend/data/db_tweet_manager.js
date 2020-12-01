const models = require("../models");

class DbTweetManager {
  constructor() {
    this.tweetQueue = [];
    this.maxQueueLenth = 100;
  }

  async addTweetToQueue(tweet) {
    this.tweetQueue.push(tweet);
    if (this.tweetQueue.length >= this.maxQueueLenth) {
      try {
        await this.insertTweets();
      } catch (err) {
        console.log(err);
        process.exit(1);
      }
    }
  }

  async insertTweets() {
    const tweetsToCreate = [...this.tweetQueue];
    this.clearTweets();
    // await models.Tweet.bulkCreate(tweetsToCreate);
  }

  clearTweets() {
    this.tweetQueue.length = 0;
  }
}

module.exports = DbTweetManager;

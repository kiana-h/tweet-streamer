const Sentiment = require("./sentiment_analyzer");

const tweetFormatter = (tweet) => {
  const hashtag = tweet.entities.hashtags.length
    ? tweet.entities.hashtags[0].text
    : "";

  let coordinates;
  if (tweet.place && tweet.place.bounding_box) {
    coordinates = tweet.place.bounding_box.coordinates[0].reduce(
      (acc, coord) => [acc[0] + coord[0], acc[1] + coord[1]]
    );
    coordinates = [coordinates[0] / 4, coordinates[1] / 4];
  }

  let filteredTweet;
  if (coordinates) {
    const sentiment = Sentiment(tweet.text, tweet.lang);
    filteredTweet = {
      twitter_uid: tweet.id,
      text: tweet.text,
      lang: tweet.lang,
      createdAt: tweet.created_at,
      sentiment: sentiment,
      hashtag,
      location: { type: "Point", coordinates },
    };
  }
  return filteredTweet;
};

module.exports = tweetFormatter;

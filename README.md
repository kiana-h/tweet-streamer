# Twitt-stream-er

Live Website: http://twitt-stream-er.com

## Features

1. **Live Tweet Map:** 
The live tweet map shows a live stream of about 1% of all tweets worldwide. The tweets have been filtered to show only those that have their location publicly shared. 

2. **Tweet Sentiment Analysis:** 
Each tweet is evaluated using a custom 'sentiment analyzer' that supports 10+ languages and emojis! The analyzer provides a score for each tweet that translates into a corresponding color on the map.

3. **7 Day History Map:** 
The history map shows an hourly aggregate of the sample stream of tweets over the past week. The tweets have been aggregated based on their location.

## Live Tweet Map
The tweets are retrieved from Twitter API's sample stream and processed through twit library. Socket.io has been implemented to support the real-time flow data from the server to clients. The map utilizes a queue to render up to 2000 tweets at a time and remove the old ones once it reaches capacity. A Tweet Manager class is designed to manage the tweet queue as well as rendering markers on the map. 

![Live Tweet Map](https://github.com/kiana-h/twitt-stream-er/blob/main/readme_assets/live-map.gif)

## Tweet Sentiment Analysis

![Tweet Sentiment Analysis](https://github.com/kiana-h/twitt-stream-er/blob/main/readme_assets/tweet-analysis.png)

## 7 Day History Map
Tweets from the past week are saved on a PostgreSQl database. Tweets are added to a queue and bulk inserted at intervals to minimize number of options posts. A crom job is run every hour to delete tweets that are older than a week. Additionally, to enhance performance, an hourly summary of the tweets for each point on the grid is saved in a separate table. The location-based aggregation is implemented using PostGIS.  
```js
const [aggregates] = await models.sequelize.query(
  `
  SELECT
    ST_SnapToGrid(location, 3) AS location,
    date_trunc('hour', "createdAt") AS time,
    AVG(sentiment) AS "sentimentScore",
    COUNT("id") AS count
  FROM tweets
  WHERE
    "createdAt" >= :dateTime::timestamptz AND "createdAt" < :dateTime::timestamptz + interval '1' hour
  GROUP BY
    date_trunc('hour', "createdAt"),
    ST_SnapToGrid(location, 3)
    `,
  {
    replacements: { dateTime },
    logging: console.log,
  }
);
```
The size of each point corresponds to the number of tweets at that location (as a percentage of all the tweets at that hour). The average sentiment score is translated into a color from a gradient, ranging from green(positive) to red(negative).

![7 Day History Map](https://github.com/kiana-h/twitt-stream-er/blob/main/readme_assets/history-map.gif)

## Technologies

- Node.js
- PostgreSQL
- Socket.io
- React
- Material UI
- MapBox GL

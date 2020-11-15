const needle = require("needle");

const token = process.env.TWITTER_BEARER;

const queryParams = {
  expansions: [
    "attachments.poll_ids",
    "attachments.media_keys",
    "author_id",
    "entities.mentions.username",
    "geo.place_id",
    "in_reply_to_user_id",
    "referenced_tweets.id",
    "referenced_tweets.id.author_id",
  ],
  "tweet.fields": [
    "attachments",
    "author_id",
    "context_annotations",
    "conversation_id",
    "created_at",
    "entities",
    "geo",
    "id",
    "in_reply_to_user_id",
    "lang",
    "public_metrics",
    "possibly_sensitive",
    "referenced_tweets",
    "source",
    "text",
    "withheld",
  ],
  "place.fields": [
    "contained_within",
    "country",
    "country_code",
    "full_name",
    "geo",
    "id",
    "name",
    "place_type",
  ],
  "user.fields": [
    "created_at",
    "description",
    "entities",
    "id",
    "location",
    "name",
    "pinned_tweet_id",
    "profile_image_url",
    "protected",
    "public_metrics",
    "url",
    "username",
    "verified",
    "withheld",
  ],
};
const queryStrings = [];
for (const param in queryParams) {
  queryStrings.push(`${param}=${queryParams[param].join(",")}`);
}
const streamURL =
  //   "https://api.twitter.com/2/tweets/sample/stream?tweet.fields=entities&place.fields=contained_within&expansions=author_id&user.fields=location";
  //   "https://api.twitter.com/2/tweets/sample/stream?expansions=geo.place_id&place.fields=country";
  `https://api.twitter.com/2/tweets/sample/stream?${queryStrings.join("&")}`;

console.log(streamURL);

function streamConnect() {
  const options = {
    timeout: 20000,
  };

  const stream = needle.get(
    streamURL,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 20000,
    },
    (err, resp) => {
      console.log(err, resp.body);
    }
  );

  stream
    .on("data", (data) => {
      try {
        const json = JSON.parse(data);
        console.log(JSON.stringify(json, null, 2));
      } catch (e) {
        // Keep alive signal received. Do nothing.
      }
    })
    .on("error", (error) => {
      if (error.code === "ETIMEDOUT") {
        stream.emit("timeout");
      }
      console.log(error);
    });

  return stream;
}

module.exports = async () => {
  // Listen to the stream.
  // This reconnection logic will attempt to reconnect when a disconnection is detected.
  // To avoid rate limites, this logic implements exponential backoff, so the wait time
  // will increase if the client cannot reconnect to the stream.

  const sampledStream = streamConnect();
  let timeout = 0;
  sampledStream.on("timeout", () => {
    // Reconnect on error
    console.warn("A connection error occurred. Reconnecting…");
    setTimeout(() => {
      timeout++;
      streamConnect(token);
    }, 2 ** timeout);
    streamConnect(token);
  });
};

// const needle = require("needle");

// const TWITTER_API_BEARER = process.env.TWITTER_BEARER;

// const topTweets = {};

// const MAX_WINDOW_SIZE = 60;

// const hashtagBuffer = [];

// setTimeout(emitTweetsForThisSecond, 1000);

// function emitTweetsForThisSecond() {
//   onNewTweets(hashtagBuffer);
//   hashtagBuffer.length = 0;
//   setTimeout(() => emitTweetsForThisSecond(hashtagBuffer), 1000);
// }

// (async () => {
//   const sampledStream = streamConnect();
//   let timeout = 0;
//   sampledStream.on("timeout", () => {
//     // Reconnect on error
//     console.warn("A connection error occurred. Reconnecting…");
//     setTimeout(() => {
//       timeout++;
//       streamConnect();
//     }, 2 ** timeout);
//     streamConnect();
//   });
// })();

// function streamConnect() {
//   const stream = needle.get(
//     "https://api.twitter.com/2/tweets/sample/stream?tweet.fields=entities",
//     {
//       headers: {
//         Authorization: `Bearer ${TWITTER_API_BEARER}`,
//       },
//     },
//     { timeout: 20000 }
//   );

//   stream
//     .on("data", (data) => {
//       try {
//         const json = JSON.parse(data);
//         if (json.data.entities.hashtags) {
//           hashtagBuffer.push(
//             ...json.data.entities.hashtags.map(({ tag }) => tag)
//           );
//         }
//       } catch (e) {
//         // Keep alive signal received. Do nothing.
//       }
//     })
//     .on("error", (error) => {
//       if (error.code === "ETIMEDOUT") {
//         stream.emit("timeout");
//       }
//     });

//   return stream;
// }

// function onNewTweets(hashtags) {
//   const newTags = {};

//   for (const tag of hashtags) {
//     if (newTags[tag]) {
//       newTags[tag]++;
//     } else {
//       newTags[tag] = 1;
//     }
//   }

//   for (const tag in newTags) {
//     if (!topTweets[tag]) {
//       topTweets[tag] = [];
//     }
//   }

//   for (const tag in topTweets) {
//     topTweets[tag].push(newTags[tag] || 0);
//     if (topTweets[tag].length > MAX_WINDOW_SIZE) {
//       topTweets[tag].shift();
//     }
//     if (!topTweets[tag].reduce((total, value) => value + total, 0)) {
//       delete topTweets[tag];
//     }
//   }

//   const orderedTopTags = [];

//   for (const tag in topTweets) {
//     orderedTopTags.push({
//       tag,
//       count: topTweets[tag].reduce((total, value) => value + total, 0),
//     });
//   }

//   orderedTopTags.sort((a, b) => b.count - a.count);

//   console.log(orderedTopTags.slice(0, 10));

//   // socket.emit('newTweets', newTags);
// }

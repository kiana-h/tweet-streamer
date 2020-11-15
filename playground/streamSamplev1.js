var Twit = require("twit");
var T = new Twit({
  access_token: process.env.V1_ACCESS_TOKEN,
  access_token_secret: process.env.V1_ACCESS_SECRET,
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  //   app_only_auth: true,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});
let counter = 0;

module.exports = async function () {
  //   var stream = T.stream("statuses/sample");
  var usa = ["-125.0011", "-66.9326", "24.9493", "49.5904"];
  //   var usa = ["-125.0011", "24.396308", "-66.885444", "49.384358"];

  //   var usa = ["-180", "-90", "180", "90"];
  var stream = T.stream("statuses/filter", { locations: usa });

  callTimeout();
  stream
    .on("tweet", function (tweet) {
      counter++;
      //   console.log(tweet);
    })
    .on("error", console.log);
};

function callTimeout() {
  setTimeout(() => {
    console.log(counter);
    counter = 0;
    callTimeout();
  }, 1000);
}

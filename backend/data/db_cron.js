const CronJob = require("cron").CronJob;
const Sequelize = require("sequelize");
const models = require("../models");

const MAX_TWEET_DURATION = 1000 * 60 * 60 * 24 * 7; // 1 week in ms

const job = new CronJob(
  "* 1 * * *",
  async () => {
    console.log("Removing old tweets");
    await models.Tweet.destroy({
      where: {
        createdAt: {
          [Sequelize.Op.lt]: Date.now() - MAX_TWEET_DURATION,
        },
      },
    });
    await models.Aggregate.destroy({
      where: {
        createdAt: {
          [Sequelize.Op.lt]: Date.now() - MAX_TWEET_DURATION,
        },
      },
    });
    console.log("Removing old tweets completed");
    const dateTime = new Date();
    dateTime.setMinutes(0, 0, 0);
    console.log("Inserting aggregates");

    await models.sequelize.query(
      `
          INSERT INTO aggregates ("createdAt", timestamp, count, "sentimentScore", location)
          SELECT
            current_timestamp,
            date_trunc('hour', "createdAt"),
            COUNT("id"),
            AVG(sentiment),
            ST_SnapToGrid(location, 3) 
          FROM tweets
        WHERE
          "createdAt" < :dateTime::timestamptz AND "createdAt" >= :dateTime::timestamptz - interval '1' hour
          GROUP BY
            date_trunc('hour', "createdAt"),
            ST_SnapToGrid(location, 3) 
        `,
      {
        replacements: { dateTime: dateTime.toISOString() },
      }
    );
    console.log("Inserting aggregates completed");
  },
  null,
  true,
  "America/Los_Angeles"
);

job.start();

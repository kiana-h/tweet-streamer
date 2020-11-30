const express = require("express");
const router = express.Router();
const models = require("../../models");

router.get("/tweets/:dateTime", async (req, res, next) => {
  const dateTime = req.params.dateTime;
  try {
    // const results = await models.sequelize.query(
    //   `SELECT id FROM tweets LIMIT 10`
    // );

    const [results] = await models.sequelize.query(
      `
        SELECT
         CAST(ST_SnapToGrid(CAST(location AS GEOMETRY), 3) AS GEOGRAPHY) AS location,
         date_trunc('hour', "createdAt") AS time,
         AVG(sentiment) AS average_sentiment,
         COUNT("id") AS count
        FROM tweets
       WHERE
        "createdAt" < :dateTime::timestamptz AND "createdAt" >= :dateTime::timestamptz - interval '1' hour
        GROUP BY
          date_trunc('hour', "createdAt"),
          CAST(ST_SnapToGrid(CAST(location AS GEOMETRY), 3) AS GEOGRAPHY)
        `,
      {
        replacements: { dateTime },
        logging: console.log,
      }
    );
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Twitter-stream-er" });
});

module.exports = router;

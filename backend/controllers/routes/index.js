const express = require("express");
const router = express.Router();
const models = require("../../models");

router.get("/tweets/:dateTime", async (req, res, next) => {
  const dateTime = req.params.dateTime;
  try {
    // if (new Date(dateTime) >= new Date().setMinutes(0, 0, 0)) {
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
    res.json(aggregates);
    // }
    // else {
    //   const aggregates = await models.Aggregate.findAll({
    //     where: {
    //       timestamp: dateTime,
    //     },
    //   });

    //   res.json(aggregates.map((aggregate) => aggregate.get({ plain: true })));
    // }
  } catch (err) {
    console.log(err);
    // res.status(500).send(err);
  }
});

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Twitter-stream-er" });
});
router.get("/*", (req, res, next) => {
  res.render("index", { title: "Twitter-stream-er" });
});

module.exports = router;

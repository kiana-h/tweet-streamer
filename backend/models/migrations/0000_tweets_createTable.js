const tweetDef = {
  attributes: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    text: {
      type: Sequelize.TEXT,
    },
    hashtag: {
      type: Sequelize.STRING,
    },
    sentiment: {
      type: Sequelize.INTEGER,
    },
    lang: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.GEOMETRY,
    },
  },
  options: { updatedAt: false },
};

const Tweet = sequelize.define("Tweet", tweetDef.attributes, tweetDef.options);

module.exports = {
  async up(queryInterface, sequelize, Sequelize) {
    await Tweet.sync({ force: true });
  },
  async down(queryInterface, sequelize, Sequelize) {},
};

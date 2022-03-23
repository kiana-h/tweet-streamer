const Sequelize = require("sequelize");
const attributes = {
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
};

module.exports = {
  async up(queryInterface, sequelize, Sequelize) {
    await sequelize.query("CREATE EXTENSION IF NOT EXISTS postgis");
    queryInterface.createTable("tweets", attributes);
  },
  async down(queryInterface, sequelize, Sequelize) {},
};

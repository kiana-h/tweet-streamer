const Sequelize = require("sequelize");

module.exports = {
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

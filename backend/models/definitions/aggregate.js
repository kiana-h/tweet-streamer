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
    timestamp: {
      type: Sequelize.DATE,
    },
    count: {
      type: Sequelize.INTEGER,
    },
    sentimentScore: {
      type: Sequelize.FLOAT,
    },
    location: {
      type: Sequelize.GEOMETRY,
    },
  },
  options: { updatedAt: false },
};

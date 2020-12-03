module.exports = {
  async up(queryInterface, sequelize, Sequelize) {
    await queryInterface.createTable("aggregates", {
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
    });
  },
  async down(queryInterface, sequelize, Sequelize) {},
};

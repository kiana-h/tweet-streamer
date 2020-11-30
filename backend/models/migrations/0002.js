module.exports = {
  async up(queryInterface, sequelize, Sequelize) {
    await queryInterface.renameColumn("tweets", "coordinates", "location");
  },
  async down(queryInterface, sequelize, Sequelize) {},
};

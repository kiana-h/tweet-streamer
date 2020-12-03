module.exports = {
  async up(queryInterface, sequelize, Sequelize) {
    await queryInterface.addIndex("aggregates", ["timestamp"]);
  },
  async down(queryInterface, sequelize, Sequelize) {},
};

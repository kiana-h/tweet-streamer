module.exports = {
  async up(queryInterface, sequelize, Sequelize) {
    await queryInterface.removeIndex("tweets", ["location"]);
    await queryInterface.addIndex("tweets", ["location"]);
  },
  async down(queryInterface, sequelize, Sequelize) {},
};

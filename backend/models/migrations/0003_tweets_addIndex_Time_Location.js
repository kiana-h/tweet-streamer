module.exports = {
  async up(queryInterface, sequelize, Sequelize) {
    await queryInterface.addIndex("tweets", ["createdAt"]);
    await queryInterface.addIndex("tweets", ["location"]);
  },
  async down(queryInterface, sequelize, Sequelize) {},
};

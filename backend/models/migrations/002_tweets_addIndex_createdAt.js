module.exports = {
  async up(queryInterface, sequelize, Sequelize) {
    await queryInterface.addIndex("tweets", ["createdAt"]);
  },
  async down(queryInterface, sequelize, Sequelize) {},
};

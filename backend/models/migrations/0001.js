module.exports = {
  async up(queryInterface, sequelize, Sequelize) {
    await queryInterface.addColumn("tweets", "twitter_uid", {
      type: Sequelize.BIGINT,
    });
  },
  async down(queryInterface, sequelize, Sequelize) {},
};

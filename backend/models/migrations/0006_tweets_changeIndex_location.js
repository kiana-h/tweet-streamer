module.exports = {
  async up(queryInterface, sequelize, Sequelize) {
    await queryInterface.removeIndex("tweets", ["location"]);
    sequelize.query(
      `
          CREATE INDEX 
            "tweets_location" 
          ON 
            "public"."tweets" 
          USING SPGIST 
            ("location")
          `
    );
  },
  async down(queryInterface, sequelize, Sequelize) {},
};

module.exports = {
  async up(queryInterface, sequelize, Sequelize) {
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

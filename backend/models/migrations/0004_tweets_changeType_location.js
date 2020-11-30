module.exports = {
  async up(queryInterface, sequelize, Sequelize) {
    sequelize.query(
      `
            ALTER TABLE 
                tweets
            ALTER COLUMN
                location
            TYPE
                GEOMETRY
            USING
                location::GEOMETRY
        `
    );
  },
  async down(queryInterface, sequelize, Sequelize) {},
};

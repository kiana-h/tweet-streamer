const Umzug = require("umzug");

module.exports = async function migrate(sequelize, Sequelize) {
  const umzug = new Umzug({
    storage: "sequelize",
    storageOptions: { sequelize },
    logging: function (name) {
      console.log(name);
    },
    migrations: {
      params: [sequelize.queryInterface, sequelize, Sequelize],
      path: `${__dirname}/migrations`,
      pattern: /.*.js$/,
    },
  });

  await umzug.up();
};

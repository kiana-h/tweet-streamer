const Sequelize = require("sequelize");
const migrations = require("./migrations");

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: null,
    ssl: true,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  });
} else {
  sequelize = new Sequelize("tweet_stream_er", "kiana", "172125kia", {
    host: "localhost",
    dialect: "postgres",
    logging: null,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  });
}
exports.sequelize = sequelize;

exports.initialize = async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (e) {
    console.log("Unable to connect to the database:", e);
  }

  await migrations(sequelize, Sequelize);

  const models = ["tweet", "aggregate"];

  for (const modelName of models) {
    const modelDefinition = require(`./definitions/${modelName}`);
    const Model = sequelize.define(
      modelName,
      modelDefinition.attributes,
      modelDefinition.options
    );
    exports[modelName[0].toUpperCase() + modelName.slice(1)] = Model;
  }
};

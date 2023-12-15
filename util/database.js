const Sequelize = require("sequelize");

const sequelize = new Sequelize("social_media", "root", "8100472356", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

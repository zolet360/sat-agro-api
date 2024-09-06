const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("satagro", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("amreo", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;

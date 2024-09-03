const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      foto: {
        type: DataTypes.BLOB("long"),
        allowNull: true,
      },
    },
    {
      tableName: "user",
      freezeTableName: true,
    }
  );

  return User;
};

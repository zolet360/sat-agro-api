const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Analise = sequelize.define(
    "Analise",
    {
      titulo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dataImagem: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      ndvi: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "analise",
      freezeTableName: true,
    }
  );

  return Analise;
};

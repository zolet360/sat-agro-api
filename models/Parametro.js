const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Parametro = sequelize.define(
    "Parametro",
    {
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coordenada1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coordenada2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coordenada3: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coordenada4: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      inicio: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      fim: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      tableName: "parametro",
      freezeTableName: true,
    }
  );

  return Parametro;
};

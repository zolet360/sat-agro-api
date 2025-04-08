const db = require("../models");
const { Op } = require("sequelize");
const Analise = db.Analise;

async function salvaImagem(titulo, dataImagem, user_id, ndvi, path) {
  const newAnalise = await Analise.create({
    titulo: titulo,
    dataImagem: dataImagem,
    user_id: user_id,
    ndvi: ndvi,
    path: path,
  });

  return newAnalise;
}

module.exports = { salvaImagem };

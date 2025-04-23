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

async function buscaAnalises(user_id, page) {
  const limit = 4;
  const offset = (page - 1) * limit;
  const { count, rows } = await Analise.findAndCountAll({
    where: {
      user_id: user_id,
    },
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });
  const totalPages = Math.ceil(count / limit);

  return { rows, count, totalPages, page };
}

module.exports = { salvaImagem, buscaAnalises };

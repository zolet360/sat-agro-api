const db = require("../models");
const { Op } = require("sequelize");
const { toLabelValue } = require("../utils/labelValueImpl");
const Parametro = db.Parametro;

async function salvaParametro(descricao, coordenada1, coordenada2, coordenada3, coordenada4, inicio, fim, user_id) {
  const newParametro = await Parametro.create({
    descricao: descricao,
    coordenada1: coordenada1,
    coordenada2: coordenada2,
    coordenada3: coordenada3,
    coordenada4: coordenada4,
    inicio: inicio,
    fim: fim,
    user_id: user_id,
  });

  return newParametro;
}

async function buscaParametros(id) {
  const parametros = await Parametro.findAll({ where: { user_id: id } });
  return parametros;
}

async function buscaPorId(id, user_id) {
  const parametro = await Parametro.findOne({ where: { user_id: user_id, id: id } });
  return parametro;
}

async function deletaParametro(id) {
  const parametro = await Parametro.destroy({ where: { id: id } });
  return parametro;
}

async function autocomplete(query, user_id) {
  const results = await Parametro.findAll({
    where: {
      user_id: user_id,
      descricao: {
        [Op.iLike]: `%${query}%`,
      },
    },
    limit: 5,
  });

  return toLabelValue(results);
}

module.exports = { salvaParametro, buscaParametros, buscaPorId, deletaParametro, autocomplete };

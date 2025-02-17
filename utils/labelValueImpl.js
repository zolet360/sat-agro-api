function toLabelValue(results) {
  const labelValueLista = [];
  results.forEach((result) => {
    var labelValue = null;
    labelValue = { label: result.descricao, value: result.id };
    labelValueLista.push(labelValue);
  });

  return labelValueLista;
}

module.exports = { toLabelValue };

const ee = require("@google/earthengine");

const getImage = async (lat1, lon1, lat2, lon2, lat3, lon3, lat4, lon4, inicio, fim) => {
  const polygon = ee.Geometry.Polygon([
    [
      [parseFloat(lon1), parseFloat(lat1)],
      [parseFloat(lon2), parseFloat(lat2)],
      [parseFloat(lon3), parseFloat(lat3)],
      [parseFloat(lon4), parseFloat(lat4)],
      [parseFloat(lon1), parseFloat(lat1)],
    ],
  ]);

  if (!inicio || !fim) {
    throw new Error("Data de início e fim são obrigatórias");
  }

  // Filtrando imagens com menos de 5% de nuvens
  const image = ee
    .ImageCollection("COPERNICUS/S2")
    .filterBounds(polygon)
    .filterDate(inicio, fim)
    .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 5)) // Reduzindo nuvens ao mínimo
    .sort("CLOUDY_PIXEL_PERCENTAGE")
    .first();

  if (!image) {
    throw new Error("Nenhuma imagem disponível para o período e área selecionada.");
  }

  // Calculando NDVI com melhor precisão
  const ndvi = image.normalizedDifference(["B8", "B4"]).rename("NDVI");

  const stats = ndvi.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: polygon,
    scale: 5, // Melhor precisão
    bestEffort: true,
  });

  const ndviValue = await stats.get("NDVI").getInfo();

  // Configuração RGB aprimorada para melhor visualização
  const rgbImage = image.select(["B4", "B3", "B2"]).visualize({
    min: 500, // Melhor contraste
    max: 4000,
    gamma: 1.3, // Ajuste para melhor nitidez
  });

  // Ajuste NDVI com cores mais perceptíveis
  const ndviVis = ndvi.visualize({
    min: -0.2,
    max: 1,
    palette: ["brown", "yellow", "green"], // Mais contraste visual
  });

  // Melhorando a qualidade das imagens geradas
  const urlNdvi = await ndviVis.getThumbURL({
    region: polygon,
    scale: 5, // Melhora definição
  });

  const url = await rgbImage.getThumbURL({
    region: polygon,
    scale: 5, // Redução melhora definição
  });

  return { url, ndviValue, urlNdvi };
};

module.exports = { getImage };

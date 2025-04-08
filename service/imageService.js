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

  const image = ee.ImageCollection("COPERNICUS/S2").filterBounds(polygon).filterDate(inicio, fim).filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 5)).sort("CLOUDY_PIXEL_PERCENTAGE").first();

  // Pega a data da imagem (em milissegundos)
  const timestamp = await image.get("system:time_start").getInfo();
  if (!timestamp) {
    throw new Error("Não foi possível obter a data da imagem.");
  }
  const dateCaptured = new Date(timestamp).toISOString().split("T")[0];

  // Calcula NDVI
  const ndvi = image.normalizedDifference(["B8", "B4"]).rename("NDVI");

  const stats = ndvi.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: polygon,
    scale: 10,
    bestEffort: true,
  });

  const ndviValue = await stats.get("NDVI").getInfo();

  // Visualização RGB
  const rgbImage = image.select(["B4", "B3", "B2"]).visualize({
    min: 500,
    max: 4000,
    gamma: 1.3,
  });

  // Visualização NDVI
  const ndviVis = ndvi.visualize({
    min: -0.2,
    max: 1,
    palette: ["brown", "yellow", "green"],
  });

  const urlNdvi = await ndviVis.getThumbURL({
    region: polygon,
    scale: 10,
  });

  const url = await rgbImage.getThumbURL({
    region: polygon,
    scale: 10,
  });

  return {
    url,
    urlNdvi,
    ndviValue,
    dateCaptured, // retorna a data
  };
};

module.exports = { getImage };

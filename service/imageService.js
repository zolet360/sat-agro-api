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

  const image = ee.ImageCollection("COPERNICUS/S2").filterBounds(polygon).filterDate(inicio, fim).sort("CLOUDY_PIXEL_PERCENTAGE").first();

  const ndvi = image.normalizedDifference(["B8", "B4"]).rename("NDVI");

  const stats = ndvi.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: polygon,
    scale: 10,
    bestEffort: true,
  });

  // Combinando as bandas RGB para gerar uma imagem normal
  const rgbImage = image.select(["B4", "B3", "B2"]); // Bandas Red, Green, Blue

  // Gerando a visualização da imagem
  const rgbVis = rgbImage.visualize({
    min: 0,
    max: 3000, // Ajuste do brilho
  });

  const ndviValue = await stats.get("NDVI").getInfo();

  const ndviVis = ndvi.visualize({
    min: -1,
    max: 1,
    palette: ["red", "green"],
  });

  const urlNdvi = await ndviVis.getThumbURL({
    region: polygon,
    scale: 5,
  });

  const url = await rgbVis.getThumbURL({
    region: polygon,
    scale: 10,
  });

  return { url, ndviValue, urlNdvi };
};

module.exports = { getImage };

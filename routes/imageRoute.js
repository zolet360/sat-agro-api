const express = require("express");
const { getImage } = require("../service/imageService");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { lat1, lon1, lat2, lon2, lat3, lon3, lat4, lon4, inicio, fim } = req.body;
    if (!lat1 || !lon1) {
      return res.status(400).json({ error: "Complete todos os campos pois são obrigatórios!" });
    }
    const object = await getImage(lat1, lon1, lat2, lon2, lat3, lon3, lat4, lon4, inicio, fim);
    res.json({ object });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

module.exports = router;

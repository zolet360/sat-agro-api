const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const { salvaImagem } = require("../service/AnaliseService");

router.post("/", authenticate, async (req, res) => {
  console.log(req.body);
  const { titulo, dataImagem, user_id, ndvi, path } = req.body;

  try {
    const analise = await salvaImagem(titulo, dataImagem, user_id, ndvi, path);
    res.status(201).json(analise);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const { salvaImagem, buscaAnalises } = require("../service/analiseService.js");

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

router.get("/:id/:page", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const imagens = await buscaAnalises(id, 1);
    if (!imagens) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(imagens);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;

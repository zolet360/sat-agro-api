const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const { salvaParametro, buscaParametros, buscaPorId, deletaParametro, autocomplete } = require("../service/parametroService");

router.post("/", async (req, res) => {
  console.log(req.body);
  const { descricao, coordenada1, coordenada2, coordenada3, coordenada4, inicio, fim, user_id } = req.body;

  try {
    const parametro = await salvaParametro(descricao, coordenada1, coordenada2, coordenada3, coordenada4, inicio, fim, user_id);
    res.status(201).json(parametro);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const parametros = await buscaParametros(id);
    if (!parametros) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(parametros);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/busca-parametro/:id/:user_id", authenticate, async (req, res) => {
  try {
    const { id, user_id } = req.params;
    const parametro = await buscaPorId(id, user_id);
    if (!parametro) {
      return res.status(404).json({ error: "Parametro Não encontrado!" });
    }
    res.json(parametro);
  } catch (error) {
    console.error("Error buscando parametro:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const parametro = await deletaParametro(id);
    if (!parametro) {
      return res.status(404).json({ error: "Parametro Não encontrado!" });
    }
    res.json(parametro);
  } catch (error) {
    console.error("erro deletando parametro:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/autocomplete/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const query = req.query.query;
  console.log(user_id);
  try {
    const results = await autocomplete(query, user_id);
    console.log(results);

    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Algo deu errado" });
  }
});

// router.put("/:id", authenticate, async (req, res) => {
//   const { id } = req.params;
//   const { nome, email } = req.body;
//   try {
//     const user = await editaUser(id, email, nome);
//     console.log(user);
//     res.json(user);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

module.exports = router;

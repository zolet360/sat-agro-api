const express = require("express");
const router = express.Router();
const { salvaUser, buscaUser, buscaUserById, editaUser } = require("../service/userService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authenticate = require("../middleware/authenticate");

router.post("/", async (req, res) => {
  console.log(req.body);
  const { nome, email, senha } = req.body;

  try {
    const user = await salvaUser(nome, email, senha);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  console.log(req.body);
  try {
    const user = await buscaUser(email);
    if (!user) {
      return res.status(401).json({ error: "E-mail ou senha incorreto" });
    }
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(401).json({ error: "E-mail ou senha incorreto" });
    }
    const token = jwt.sign({ userId: user.id }, "your_secret_key", { expiresIn: "1h" });
    console.log(token);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/me", authenticate, async (req, res) => {
  try {
    console.log(req.user);
    const user = await buscaUserById(req.user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  try {
    const user = await editaUser(id, email, nome);
    console.log(user);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

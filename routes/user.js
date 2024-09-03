const express = require("express");
const router = express.Router();
const { salvaUser } = require("../service/userService");

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

module.exports = router;

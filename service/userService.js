const db = require("../models");
const User = db.User;
const bcrypt = require("bcryptjs");

async function salvaUser(nome, email, senha) {
  const hashedPassword = await bcrypt.hash(senha, 10);

  const newUser = await User.create({
    nome: nome,
    email: email,
    senha: hashedPassword,
  });
  return newUser;
}

module.exports = { salvaUser };

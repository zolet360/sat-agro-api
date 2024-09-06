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

async function buscaUser(email) {
  const user = await User.findOne({ where: { email } });
  return user;
}

async function buscaUserById(userToken) {
  const user = await User.findByPk(userToken.userId, {
    attributes: { exclude: ["senha"] },
  });
  return user;
}

// await User.findOne({ where: { email } });
module.exports = { salvaUser, buscaUser, buscaUserById };

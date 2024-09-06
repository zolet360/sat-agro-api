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

async function editaUser(id, email, nome) {
  const user = await User.findByPk(id);
  const userByEmail = await buscaUser(email);
  if (userByEmail && userByEmail.id !== user.id) {
    throw new Error("E-mail ja em uso!");
  }
  user.nome = nome;
  user.email = email;
  await user.save();
  return user;
}

module.exports = { salvaUser, buscaUser, buscaUserById, editaUser };

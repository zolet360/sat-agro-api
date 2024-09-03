const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const db = require("./models");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

sequelize
  .authenticate()
  .then(() => {
    console.log("Banco Conectado com sucesso!");
  })
  .catch((err) => {
    console.error("Falha ao conectar Banco de dados", err);
  });

db.sequelize
  .sync({ force: false, alter: true })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

const userRoutes = require("./routes/user");

// // Usar rotas
app.use("/user", userRoutes);

// Inicia o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

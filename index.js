const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

//? crear el servidor de express
const app = express();
//? base de datos
dbConnection();

//? cors
app.use(cors());

//? directorio publico
app.use(express.static("public"));

//? lectura y parseo
app.use(express.json());

//? Configuracion de rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//? escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en puerto ${4000}`);
});

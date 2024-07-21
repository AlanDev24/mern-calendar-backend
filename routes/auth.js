const express = require("express");
const { check } = require("express-validator");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = express.Router();

router.post(
  "/new",
  [
    check("name", "el nombre es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password debe de ser de 7 caracteres").isLength({
      min: 7,
    }),
    validarCampos,
  ],
  crearUsuario
);
router.post(
  "/",
  [
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password debe de ser de 7 caracteres").isLength({
      min: 7,
    }),
    validarCampos,
  ],
  loginUsuario
);

router.get("/renew", validarJWT, revalidarToken);

module.exports = router;

const express = require("express");
const {
  getEventos,
  createEvento,
  updateEvento,
  deleteEvento,
} = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");
const isDate = require("../helpers/isDate");
const router = express.Router();

router.use(validarJWT);

// obtener eventos
router.get("/", getEventos);
//crear evento
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalizacion es obligatoria").custom(isDate),
    validarCampos,
  ],
  createEvento
);
//actualizar evento
router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalizacion es obligatoria").custom(isDate),
    validarCampos,
  ],
  updateEvento
);
//borrar evento
router.delete("/:id", deleteEvento);

module.exports = router;

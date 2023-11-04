const express = require("express");
const router = express.Router();

const ArticuloControlador = require("../controladores/Articulo");

router.get("/prueba", ArticuloControlador.prueba );
router.get("/curso", ArticuloControlador.curso );

//Ruta util uso de metodo post
router.post("/crear", ArticuloControlador.crear)

module.exports = router;


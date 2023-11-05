const express = require("express");
const router = express.Router();

const ArticuloControlador = require("../controladores/Articulo");

router.get("/prueba", ArticuloControlador.prueba );
router.get("/curso", ArticuloControlador.curso );

//Ruta util uso de metodo post
router.post("/crear", ArticuloControlador.crear)
router.get("/articulos/:ultimos?", ArticuloControlador.listar );
router.get("/articulo/:id", ArticuloControlador.uno );
router.delete("/articulo/:id", ArticuloControlador.borrar );
router.put("/articulo/:id", ArticuloControlador.editar ); //metodo http para actualizar

module.exports = router;


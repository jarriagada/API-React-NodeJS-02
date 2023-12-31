const express = require("express");
const multer = require("multer"); //multer

const router = express.Router();

const ArticuloControlador = require("../controladores/Articulo");

//Configuracion de multer
  //metodo cd, primer param null, seg param el destino del archivo repositorio
//primer param null, seg param nombre personalizado del archivo
const almacenamiento = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./imagenes/articulos/" ) 
    },
    filename: function(req, file, cb){
        cb(null, "articulo" + Date.now() + file.originalname);
    }
})
const subidas = multer({storage: almacenamiento});
//fin configuracion multer


router.get("/prueba", ArticuloControlador.prueba );
router.get("/curso", ArticuloControlador.curso );

//Ruta util uso de metodo post
router.post("/crear", ArticuloControlador.crear)
router.get("/articulos/:ultimos?", ArticuloControlador.listar );
router.get("/articulo/:id", ArticuloControlador.uno );
router.delete("/articulo/:id", ArticuloControlador.borrar );
router.put("/articulo/:id", ArticuloControlador.editar ); //metodo http para actualizar
//subir imagen
router.post("/subir-imagen/:id", [subidas.single("file0")], ArticuloControlador.subir)
router.get("/imagen/:fichero", ArticuloControlador.imagen );
//buscar
router.get("/buscar/:busqueda", ArticuloControlador.buscador );



module.exports = router;


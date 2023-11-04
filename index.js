const {conexion} = require("./basedatos/conexion")
const express = require("express");
const cors = require("cors");

//Inicia APP
console.log("App node Arrancada")

//conexion a base de datos
conexion();

//Crear servidor NodeJS
const app = express();
const puerto = 3900;
//Configurar cors, se usa el midleware del cors, se ejecuta antes
//evita errores de rutas cruzadas
app.use(cors());

//Leer y convertir el body en un objeto javascript
//para tener objeto js usable en el codigo, queda parseado
app.use(express.json());

//crear rutas

//crear servidor y escuchar (get) , peticiones (post) http
//se le pasa un puerto como parametro para escuchar
app.listen(puerto, () => {
    console.log("servicio escuchando en el puerto : " + puerto)
})
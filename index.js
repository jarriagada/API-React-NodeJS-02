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
app.use(express.json());// de esta forma para recibir datos con content-type app/json
app.use(express.urlencoded({extended:true})); //formato x-www-form-urlencoded


//RUTAS
const rutas_articulo = require("./rutas/articulo");


//Cargo las rutas automaicas
app.use("/api", rutas_articulo);


//ruta pruebas hardcore
//crear rutas, con mongoose 6.4.3 con funcion de call-back
app.get("/ruta-prueba", (req, res) => {

    console.log("se ha ejecutado el EndPoint ruta-prueba")

    return res.status(200).json([
        {
            curso: "node JS",
            autor: "VR",
            url: "jarriagada.cl"
        },
        {
            curso: "node React",
            autor: "VR",
            url: "jarriagada.cl"
        }

    ]
    );
     

} )

//crear servidor y escuchar (get) , peticiones (post) http
//se le pasa un puerto como parametro para escuchar
app.listen(puerto, () => {
    console.log("servicio escuchando en el puerto : " + puerto)
})

const validator = require("validator");

//metodo prueba GET
const prueba = (req, res) =>{

    return res.status(200).json({
        mensaje: "accion de prueba desde el controlador"
    })

};

//Metodo curso GET
const curso =  (req, res) => {

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
     
} ;

//Metodo crear articulo POST
const crear = (req, res) => {

    //1. recoger los parametros que llegan por post a guardar
    let parametros = req.body;

    //2.Validar los datos

    try{

        let validar_Titulo = !validator.isEmpty(parametros.titulo) &&
                            validator.isLength(parametros.titulo, {min: 5, max: 25});

        let validar_Contenido = !validator.isEmpty(parametros.contenido) 

        if(!validar_Titulo || !validar_Contenido){
           throw new Error("No se ha podido validar")
            
        }

    } catch(error){

        return res.status(400).json({
            mensaje: "Faltan datos por enviar",
            status: "error"
        })

    }

    return res.status(200).json({
        mensaje: "metodo crear aticulo funcionando desdde el controlador",
        parametros
    })
    
}
module.exports = {
    prueba,
    curso,
    crear
}

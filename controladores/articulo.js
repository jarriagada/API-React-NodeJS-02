
const validator = require("validator");

const Articulo = require("../modelos/Articulo");

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

    //3. crear el objeto a guardar, del model de articulo
    // se le pasan los urlparams req.body
    const articulo = new Articulo(parametros);
    //4. asignar valores al objeto basado en el modelo
    //la version 6.4.3 de mongoose es con call-back
    articulo.save((error, articuloGuardado) => {

        if(error || !articuloGuardado) {
            return res.status(400).json({
                mensaje: "Faltan datos por enviar",
                status: "error"
            })
    
        }
    
        return res.status(200).json({
            status: "success",
            articulo: articuloGuardado,
            mensaje: "Articulo creado con exito"
        })

    })// fin crear articulo
}

    //conseguir articulo
    //va a hacer una consulta a la base de datos y devolvera un resultado
    const listar = (req, res) => {
        //Articulo es el modelo
        let consulta = Articulo.find({}).exec((error, articulos) => {

            if(error || !articulos){

                return res.status(404).json({
                    status: "error",
                    mensaje: "No se encontraron articulos"
                   
                });
            }

            return res.status(200).send({
                status: "success",
                articulos
            });


        });
    }

    //5. guardar el articulo en la base de datos 

    //6. Devolver resultados





module.exports = {
    prueba,
    curso,
    crear,
    listar
}

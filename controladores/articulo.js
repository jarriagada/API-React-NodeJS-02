
const {validarArticulo} = require("../helper/validar");
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

      validarArticulo(parametros);

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
    //5. guardar el articulo en la base de datos 
        return res.status(200).json({
            status: "success",
            articulo: articuloGuardado,
            mensaje: "Articulo creado con exito"
        })

    })// fin crear articulo
}; //fin crear


    //metodo listar todo con limite de 3 para el home
    //conseguir articulo
    //va a hacer una consulta a la base de datos y devolvera un resultado
    const listar = (req, res) => {
        //Articulo es el modelo
        let consulta = Articulo.find({}); 

        if(req.params.ultimos ) {
            consulta.limit(3);
        }

        
        consulta.sort({fecha: -1})
                .exec((error, articulos) => {

            if(error || !articulos){

                return res.status(404).json({
                    status: "error",
                    mensaje: "No se encontraron articulos"
                   
                });
            }

            //6. Devolver resultados
            return res.status(200).send({
                status: "success",
                parametro: req.params.ultimos,
                contador: articulos.length,
                articulos
            });


        });
    }; //fin listar

    //metodo buscar uno por id
    const uno = (req, res) => {

        //recofer un id por la url
        let id = req.params.id;

        //buscar el articulo, usando el Modelo Articulo
        Articulo.findById(id, (error, articulo) => {

        // si no existe devolver error
        if(error || !articulo){

            return res.status(404).json({
                status: "error",
                mensaje: "No se encontro el articulo"
               
            });
        }

        return res.status(200).json({
            status: "success",
            articulo
        })
        
        // si existe devolver resultado

        })
       
    };
    // fin uno

    //Metodo delete
    const borrar = (req, res) => {

        // obtener el id de parametros
        const articuloId = req.params.id;

        // uso del modelo para la consulta
        Articulo.findOneAndDelete({_id: articuloId}, (error, articuloBorrado) => {

            if(error || !articuloBorrado) {

                return res.status(500).json({
                    status: "error",
                    mensaje: "No se elimino el articulo"
    
                });
            }

            return res.status(200).json({
                status: "success",
                articulo: articuloBorrado,
                mensaje: "Articulo borrado..."
            })

        });

    }; //fin borrar

    //Editar articulo metodo put
    const editar = (req, res) => {
        //recoger id articulo a editar
        let articuloId = req.params.id;

        //recoger datos del body
        let parametros = req.body;


    try {
        //Validar datos
        validarArticulo(parametros)

    } catch(error){
    
        return res.status(400).json({
            mensaje: "Faltan datos por enviar",
            status: "error"
        })

    }

        //Buscar Y Actualizar articulo, usando el modelo, con la opcion new:true devuelve el objeto actualizado
        Articulo.findOneAndUpdate({_id: articuloId}, req.body, {new:true}, (error, articuloActualizado) => {

            if(error || !articuloActualizado){
                return res.status(500).json({
                    status:"error",
                    mensaje: "error al actualizar"
                });
            }


            //Devolver respuesta
            return res.status(200).json({
                status: "succes",
                articulo: articuloActualizado

            })

        });

    };//FIN editar uno



module.exports = {
    prueba,
    curso,
    crear,
    listar,
    uno, 
    borrar,
    editar
}

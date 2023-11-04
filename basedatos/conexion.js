const mongoose = require("mongoose")

conexion = async()=> {

    try{
        //Conexion a mongoDB y BD
        await mongoose.connect("mongodb://127.0.0.1:27017/mi_blog")
        console.log("conectado a la base de datos mi_blog")

    } catch(error){
        console.log(error);
        throw new Error("TRROW Error en la conexion");

    }
}
//exportar con formato modulo de nodeJS
module.exports={
    conexion
}

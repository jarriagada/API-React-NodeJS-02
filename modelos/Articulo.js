const {Schema, model} = require("mongoose");

const ArticuloSchema = Schema({

    titulo: {
        type: String,
        required: true,
        uppercase: true
    },
    contenido: {
        type: String,
        required: true

    },
    fecha: {
        type: Date,
        default: Date.now
    },
    imagen: {
        type: String,
        default: "default.png"
    }

});
// tercer parametro nombre de la coleccion
// el primer parametro en singular, mongoose la deja en plural...mejor indicar 3° param
module.exports = model("Articulo", ArticuloSchema, "articulos")
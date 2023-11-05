
const validator = require("validator");
const validarArticulo = (parametros) => {

    let validar_Titulo = !validator.isEmpty(parametros.titulo) &&
        validator.isLength(parametros.titulo, { min: 5, max: 25 });

    let validar_Contenido = !validator.isEmpty(parametros.contenido)

    if (!validar_Titulo || !validar_Contenido) {
        throw new Error("No se ha podido validar")

    }

};

module.exports = {
    validarArticulo
}
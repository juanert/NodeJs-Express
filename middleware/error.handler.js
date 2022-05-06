//Creamos una funcion que nos hara llegar a un middleware de tipo error
function logErrors(err, req, res, next) {
    console.log(error) //Mostrar el error en consola para saber cual es
    next(err)//Una funcion que se puede ejecutar para trabajar mas a fondo con el error
}

//Crear formato para devolverlo al cliente, esta se complementa con la funcion anterior
function errorHandler(err, req, res, next) { //no todos los parametros tienen porque ser utilizados
    res.status(500).json({ //Indicamos que el error es de tipo 500 (internal server error)
        message: err.message, //mostrar el mensaje del error
        stack: err.stack //mostrar info detallada del error
    })
}

//Manejador con BOOM, libreria que automaticamente selecciona el tipo de error y mensaje
function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler }; //Permitimos exportar las funciones que creamos
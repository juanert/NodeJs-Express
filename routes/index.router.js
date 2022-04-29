//ARCHIVO PARA REQUERIR E INICIALIZAR TODAS LAS RUTAS
//1) REQUERIMOS A EXPRESS, DE NUEVO
const express = require('express');
//2) REQUERIMOS TODAS LAS RUTAS ASOCIADAS AL PROYECTO
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');

//3) CREAMOS UNA FUNCION QUE RECIBE COMO PARAMETRO EXPRESS
//LE DECIMOS QUE UTILICE LAS RUTAS.
function routerApi(app) {
    //REQUERIMOS AL ROUTER DE EXPRESS
    const router = express.Router();
    //CREO UNA RUTA CON LA VERSION DE MI API
    //DEBIDO A QUE PUEDE HABER VARIAS VERSIONES
    //DEBIDO A QUE PUEDE SER UTILIZADO POR MUCHOS SISTEMAS
    app.use('/api/v1', router);
    //LLAMO A TODAS LAS RUTAS DE MI APP, UTILIZANDO ROUTER (LA VERSION)
    router.use('/products', productsRouter);
    router.use('/categories', categoriesRouter);
    router.use('/users', usersRouter);
}

//4) PERMITIR LA EXPORTACION DE LA FUNCION
//PARA PODER UTILIZARLA EN OTROS ARCHIVOS
module.exports = routerApi;
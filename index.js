//INDEX: ARCHIVO QUE INICIALIZA UN PROYECTO
//CONFIGURACIONES BASICAS
// 1) REQUERIMOS EXPRESS
const express = require('express');
//4) REQUERIMOS TODAS LAS RUTAS DEL PROYECTO
const routerApi = require('./routes/index.router')

//2) CREAMOS UNA APLICACION EXPRESS Y UN PUERTO
const app = express();
const port = 3000;

app.get(express.json());

//CREAMOS UNA RUTA CON LOS PARAMETROS DE REQUERIR Y RESPONDER
//Esta ruta utiliza el metodo GET
//Esta estructura es un callback (asincronismo en Javascript)
//El '/' hace enfasis en mi ruta principal, es decir. Localhost:300
//en este caso. 

app.get('/', (req,res) => {
    //FUNCIONA ANONIMA O ARROW FUNCTION
    res.send('Hola Mundo');
});


//4) CREAR RUTAS PARA CADA DATO DE MI APP
//DENOTAR QUE ESTAMOS ENVIANDOLE EXPRESS COMO PARAMETRO
//FUNCION UBICADA EN CARPETA ROUTES, ARCHIVO INDEX.JS
routerApi(app);

//3)HACER QUE MI APLICACION EJECUTE O ESCUCHE EN EL PUERTO INDICADO
app.listen(port, () => {
    console.log('Mi port ' + port);
});
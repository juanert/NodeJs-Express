//INDEX: ARCHIVO QUE INICIALIZA UN PROYECTO
//CONFIGURACIONES BASICAS
// 1) REQUERIMOS EXPRESS
const express = require('express');
//4) REQUERIMOS TODAS LAS RUTAS DEL PROYECTO
const routerApi = require('./routes/index.router')
//REQUERIR CORS PARA VALIDAR QUIENES TIENEN ACCESO
const cors = require('cors');
//REQUERIR MIDDLEWARES
const { logErrors, errorHandler, boomErrorHandler } = require('./middleware/error.handler')

//2) CREAMOS UNA APLICACION EXPRESS Y UN PUERTO
const app = express();
const port = 3000;

app.get(express.json());
//LISTA BLANCAS DE SITIOS PERMITIDOS
const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

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

//LOS MIDDLEWARES TIENEN QUE SER UTILIZADOS LUEGO DE LAS RUTAS
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//3)HACER QUE MI APLICACION EJECUTE O ESCUCHE EN EL PUERTO INDICADO
app.listen(port, () => {
    console.log('Mi port ' + port);
});
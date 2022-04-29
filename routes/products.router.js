//1) REQUERIR EXPRESS
const express = require('express');
/* 
OPCIONAL: EN ESTE CASO, REQUERIR FAKER PARA CREAR 
DATOS FALSOS
*/
/*
EL CREADOR DE FAKER ES UN BROMISTA, Y DA;O SU PROPIA LIBRERIA
ASI QUE TENEMOS QUE INSTALAR UNA VERSION VIEJA DE FAKER, EL COMANDO
ES EL SIGUIENTE:
npm i faker@5.5.3 -s*/
const faker = require('faker');

//2) REQUERIR ROUTER
const router = express.Router();

//CREAMOS NUESTRA PRIMERA RUTA CON METODO GET
//PARA OBTENER TODOS LOS PRODUCTOS
router.get('/', (req,res) => {
    //CREAMOS UN ARRAY(LISTA) VACIO DE PRODUCTOS
    const products = [];
    //REQUERIMOS UN PARAMETRO OPCIONAL PARA SABER CUANTOS
    //PRODUCTOS VAMOS A TRAER
    const { size } = req.query; //req.query son parametros opcionales
    const limit = size || 10; // || significa 'OR' o 'O' //productos?size=10
    //En caso de no recibir un tama;o, limit sera 10
    //REALIZAMOS UN CICLO PARA CREAR LOS PRODUCTOS
    for(let index = 0; index < limit; index++) {
        //Agregando productos falsos al array de productos
        //Funcion push sirve para agregar elementos al array
        products.push({
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(), 10),
            image: faker.image.imageUrl(),
        });
    }
    //DEVUELVE EL ARRAY DE PRODUCTOS COMO UN JSON
    res.json(products);
}); 

router.get('/:id', (req,res) => {
    // const id = req.params.id;
    const { id } = req.params;
    if (id === '999') {
        res.status(404).json({
            message: 'Not found'
        })
    } else {
        res.status(200).json({
            name: 'Product',
            price: 100
        })
    }
});

router.post('/', (req, res) => {
    const body = req.body;
    res.json({
        message: 'created',
        data: body
    })
})

module.exports = router;
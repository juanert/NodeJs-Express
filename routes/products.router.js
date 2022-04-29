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

const ProductsService = require('./../services/product.service');
const service = new ProductsService();

//2) REQUERIR ROUTER
const router = express.Router();

//CREAMOS NUESTRA PRIMERA RUTA CON METODO GET
//PARA OBTENER TODOS LOS PRODUCTOS
router.get('/', (req,res) => {
    const products = service.find();
    //DEVUELVE EL ARRAY DE PRODUCTOS COMO UN JSON
    res.json(products);
});


//LLAMAR A UN PRODUCTO ESPECIFICO
// :id ES UN PARAMETRO QUE SE RECIBE EN LA URL
router.get('/:id', (req,res) => {
    // const id = req.params.id;
    const { id } = req.params; //Declarando el parametro que recibimos y lo guardamos
    //en una variable
    const product = service.findOne(id)
    res.json(product);
});


//RUTA POST PARA CREAR PRODUCTOS
router.post('/', (req, res) => {
    const body = req.body;
    const newProduct = service.create(body)
    res.status(201).json(newProduct);
})

//ACTUALIZAR UN PRODUCTO PARCIALMENTE
router.patch('/:id', (req, res) => {
    const { id } = req.params; //req.params para indicar que es un parametro
    //REQUERIMOS QUE SE QUIERE ACTUALIZAR
    const body = req.body;
    //UNA RESPUESTA
    res.json({
        message: 'update',
        data: body,
        id
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        message: 'deleted',
        id
    });
});

module.exports = router;
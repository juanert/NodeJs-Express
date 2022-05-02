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
//METODO ASINCRONO PARA NO OCUPAR LA PILA DE TAREAS PRINCIPAL
//Y PODER TRABAJAR CON MUCHAS PETICIONES AL MISMO TIEMPO
router.get('/', async (req,res) => {
    //COMO EL SERVICIO ES ASINCRONO, QUEDA ESPERANDO UNA PROMESA.
    const products = await service.find();
    //DEVUELVE EL ARRAY DE PRODUCTOS COMO UN JSON
    res.json(products);
});


//LLAMAR A UN PRODUCTO ESPECIFICO
// :id ES UN PARAMETRO QUE SE RECIBE EN LA URL
router.get('/:id', async (req,res) => {
    // const id = req.params.id;
    const { id } = req.params; //Declarando el parametro que recibimos y lo guardamos
    //en una variable
    const product = await service.findOne(id)
    res.json(product);
});


//RUTA POST PARA CREAR PRODUCTOS
router.post('/', async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body)
    res.status(201).json(newProduct);
})

//ACTUALIZAR UN PRODUCTO PARCIALMENTE
router.patch('/:id', async (req, res) => {
    const { id } = req.params; //req.params para indicar que es un parametro
    //REQUERIMOS QUE SE QUIERE ACTUALIZAR
    const body = req.body; 
    const product = await service.update(id, body)
    res.json(product);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const answer = await service.delete(id);
    res.json(answer);
});

module.exports = router;
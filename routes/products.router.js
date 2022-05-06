//1) REQUERIR EXPRESS
const express = require("express");

const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middleware/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');

//2) REQUERIR ROUTER
const router = express.Router();
const service = new ProductsService();

//CREAMOS NUESTRA PRIMERA RUTA CON METODO GET
//PARA OBTENER TODOS LOS PRODUCTOS
//METODO ASINCRONO PARA NO OCUPAR LA PILA DE TAREAS PRINCIPAL
//Y PODER TRABAJAR CON MUCHAS PETICIONES AL MISMO TIEMPO
router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

//LLAMAR A UN PRODUCTO ESPECIFICO
// :id ES UN PARAMETRO QUE SE RECIBE EN LA URL
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

//RUTA POST PARA CREAR PRODUCTOS
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

//ACTUALIZAR UN PRODUCTO PARCIALMENTE
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;

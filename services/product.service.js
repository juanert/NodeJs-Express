const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    //REALIZAMOS UN CICLO PARA CREAR LOS PRODUCTOS
    for (let index = 0; index < limit; index++) {
      //Agregando productos falsos al array de productos
      //Funcion push sirve para agregar elementos al array
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
      //INSERTAR TODAS LAS PROPIEDADES DENTRO DE DATA
			//(Llamar todas las propiedades que vengan dentro de data)
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products);
      }, 3000);
    })
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    //BUSCO EL ELEMENTO DENTRO DEL ARRAY
    const index = this.products.findIndex(item => item.id === id);
    //ENVIO UN ERROR EN CASO DE QUE NO EXISTA
    if (index === -1) {
      //ERROR ES UNA CLASE PROPIA DE JS PARA ARROJAR MENSAJES DE ERROR
      throw boom.notFound('product not found');
      //Si hay un error, la ejecucion de la funcion se para
    }
    //CREO UNA VARIABLE PARA CARGAR EL PRODUCTO QUE VOY A MODIFICAR
    //(Una vez obtenido su indice)
    const product = this.products[index];
    //Cargo las propiedades que el producto ya tiene
    //y sus cambios
    this.products[index] = {
      ...product,
      ...changes
    };
    //RETORNAR EL PRODUCTO
    return this.products[index];
  }

  async delete(id) {
    //BUSCO EL ELEMENTO DENTRO DEL ARRAY
    const index = this.products.findIndex(item => item.id === id);
    //ENVIO UN ERROR EN CASO DE QUE NO EXISTA
    if (index === -1){
      //ERROR ES UNA CLASE PROPIA DE JS PARA ARROJAR MENSAJES DE ERROR
      throw new Error('product not found');
      //Si hay un error, la ejecucion de la funcion se para
    }
    this.products.splice(index, 1);
    return { id }
  }

}

module.exports = ProductsService;

const faker = require("faker");

class ProductsService {
  constructor() {
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
      });
    }
  }

  create(data) {
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
    return  this.products;
  }

  findOne(id) {
    return this.products.find(item => item.id === id)
  }

  update() {}

  delete() {}
}

module.exports = ProductsService;
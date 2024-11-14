const { faker } = require('@faker-js/faker'); // Usar la nueva versión
// const rutas = require('../routes/rutas');
// const id = require('faker/lib/locales/id_ID');

class productService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: i + 1,
        productName: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stoke: faker.datatype.boolean(),
        categoryId: faker.number.int(101),
        brandId: faker.number.int(101),
        imagenUrl: faker.image.url(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: this.products.length + 1,
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async getAll() {
    // Promise es una tarea asincrona que se ejecuta en segundo plano y no bloquea el hilo principal de ejecución de la aplicación.
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(this.products);
    //   }, 10000);
    // });
    return this.products;
  }

  async getById(id) {
    // const name = this.getTotal();
    return this.products.find((product) => product.id == id);
  }

  async update(id, changes) {
    const index = this.products.findIndex((product) => product.id == id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((product) => product.id == id);
    if (index == -1) {
      throw new Error('Product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = productService;

// middleware es una función que se ejecuta antes de que llegue a una ruta o endpoint

// en express  y en otros frameworks son funciones que se ejecutan durante el ciclo de vida
// de una solicitud (request) a un servidor. Actuan como una capa intermedia entre la recepcion de la solicitud
// y la respuesta enviada al cliente.

// Para que sirve los middleware?
// 1. procesar solicitudes: permite manipular las solicitudes entrantes antes de que lleguen a los manejadores de rutas (endpoints)
// 2. respuesta: puede modificar las respuestas antes de que se envie de vuelta al cliente
// 3. encaenar tareas: permite encaenar una serie de funciones que se ejecutaran en orden, cada una de las cuales puede realizar una tarea especifica
// 4. control de flujo: permite determinar si se debe continuar con el siguiente middleware o manejador de ruta o si se debe cortar la cadena de middleware

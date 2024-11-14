const { faker } = require('@faker-js/faker');

class brandService {
  constructor() {
    this.brands = [];
    this.generateBrands();
  }

  // generar los 100 brands
  generateBrands() {
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.brands.push({
        id: i + 1,
        brandName: faker.company.name(),
        description: faker.company.catchPhrase(),
        active: faker.datatype.boolean(),
      });
    }
  }

  // obtener todos los brands
  async getAllBrands() {
    return this.brands;
  }

  // conseguir brand por Id
  async getByIdBrand(id) {
    const brand = this.brands.find((brand) => brand.id == id);
    return brand;
  }

  // agregar nuevo brand
  async createBrand(data) {
    const newBrand = {
      id: this.brands.length + 1,
      ...data
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  // actualizar brand por Id
  async updateBrand(id, changes) {
    const index = this.brands.findIndex((brand) => brand.id == id);

    if (index == -1) {
      throw new Error('brand not found');
    }
    const brand = this.brands[index];
    this.brands[index] = {
      ...brand,
      ...changes
    };
    return this.brands[index];
  }

  // eliminar brand por Id
  async deleteBrand(id) {
    const index = this.brands.findIndex((brand) => brand.id == id);
    if (index == -1) {
      throw new Error('brand not found');
    }
    this.brands.splice(index, 1);
    return {id};
  }
}

module.exports = brandService;

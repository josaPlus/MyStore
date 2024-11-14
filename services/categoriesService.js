const { faker } = require('@faker-js/faker'); // Usar la nueva versión

class categoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.categories.push({
        id: i + 1,
        categoryName: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        active: faker.datatype.boolean(),
      });
    }
  }

  // todos las categories
  async getAllCategories() {
    return this.categories;
  }

  // por id
  async getByIdCategories(id) {
    return this.categories.find((categorie) => categorie.id == id);
  }

  // agregar nueva categorie
  async createCategorie(data) {
    const newCategorie = {
      id: this.categories.length + 1,
      ...data
    }
    this.categories.push(newCategorie);
    return newCategorie;
  }

  // actualizar un categorie
  async updateCategorie(id, changes) {
    const index = this.categories.findIndex((categorie) => categorie.id == id);
    if (index == -1) {
      throw new Error('categorie not found');
    }

    const categorie = this.categories[index];
    this.categories[index] = {
      ...categorie,
      ...changes
    }
    return this.categories[index];
  }

  // eliminar un categorie
  async deleteCategorie(id) {
    const index = this.categories.findIndex((categorie) => categorie.id == id);
    if (index == -1) {
      throw new Error('categorie not found');
    }
    this.categories.splice(index, 1);
    return {id};
  }
}

module.exports = categoriesService;

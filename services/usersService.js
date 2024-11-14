const { faker } = require('@faker-js/faker'); // Usar la nueva versión
const id = require('faker/lib/locales/id_ID');

class usersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: i + 1,
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        userName: faker.internet.userName(),
        description: faker.person.bio(),
        active: faker.datatype.boolean(),
      });
    }
  }

  // conseguir todos los usuarios
  async getAllUsers() {
    return this.users;
  }

  // conseguir por id
  async getByIdUsers(id) {
    return this.users.find((user) => user.id == id);
  }

  // creau nuevo user
  async createUser(data) {
    const newUser = {
      id: this.users.length + 1,
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  // actualizar datos de user
  async updateUser(id, changes){
    const index = this.users.findIndex((user) => user.id == id);
    if (index == -1) {
      throw new Error('user not found')
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    }
    return this.users[index];
  }

  async deleteUser(id) {
    const index = this.users.findIndex((user) => user.id == id);
    if (index == -1) {
      throw new Error('user not found')
    }
    this.users.splice(index, 1)
    return {id}
  }
}

module.exports = usersService;

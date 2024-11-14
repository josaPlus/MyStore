// swagger
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuracion de swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentacion de la API', //titulo de la documentacion
    version: '1.0.0', //version de la API
    description: 'Documentacion de la API con swagger', //descripcion de la API
  },
  servers: [
    {
      // http://localhost:3000/api/v1
      url: 'http://localhost:3000/', //URL base de la api
      description:'Servidor de desarrollo' //descripcion del servidor
    }
  ]
}

// opciones de swagger para la documentacion de la API
const options = {
  // informacion de la documentacion
  swaggerDefinition,
  // acceso a todas las rutas de los archivos definidos
  apis: ['./routes/*.js'],
}

// esta variable contiene la documentacion de la API generada por swagger
const swaggerSpec = swaggerJSDoc(options);

// funcion para configurar swagger en la aplicacion express
function setUpSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setUpSwagger;

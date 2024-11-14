const express = require('express');
const  rutas  = require('./routes/rutas');
// importar el modulo de swagger para ser utilizado en el archivo index.js
const setUpSwagger = require('./swagger');
// importar los middlewares de error para ser utilizados en el archivo index.js
const {logErrors, errorHandler} = require('./middlewares/errorHandler');


const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to my store!');
});

app.get('/nuevaruta', (req, res) => {
  res.send('nueva ruta');
});

// rutas de las APIs
rutas(app);

// Configuracion de swagger
setUpSwagger(app);

// middleware para manejo de errores
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


// implementar capas de Servicio, middleware controlador de errores y swagger en los endpoint previamente donde hay
// users, categories, brands y product, estos deben funcionar correctamente y se provaran desde swagger, si no esta la arquitectura correcta
// no se hara la revision

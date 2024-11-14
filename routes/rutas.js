// endpoint para productos
const productosRouter = require('./productsRouter');
// endopoint para usuarios
const usuariosRouter = require('./userRouter');
// endpoint para categorias
const categoriasRouter = require('./categoriesRouter');
// endpoint para marcas
const marcasRouter = require('./brandsRouter');

const moviesRouter = require('./moviesRouters');


// function routerApiProducts(app){
//     app.use('/products', productosRouter);
// }

// function routerApiUsers(app) {
//   app.use('/users', usuariosRouter);
// }

// function routerApiCategories(app) {
//   app.use('/categories', categoriasRouter);
// }

// function routerApiBrands(app) {
//   app.use('/brands', marcasRouter);
// }

function rutas(app) {
  // app.use('/api/v1', router)
  app.use('/brands', marcasRouter);
  app.use('/categories', categoriasRouter);
  app.use('/users', usuariosRouter);
  app.use('/products', productosRouter);
  app.use('/movies', moviesRouter);
}

module.exports = rutas;



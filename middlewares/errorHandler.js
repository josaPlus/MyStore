// function para mandar en la consola los errores que se generen en la aplicacion
function logErrors (err, req, res, next) {
  console.log(err);
  next(err);
}

// funcion para manejar los errores que se generen en la aplicacion y mandar una 
// respuesta al cliente con el error que se genero en la aplicacion
function errorHandler (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  });
}

module.exports = {
  logErrors,
  errorHandler
}

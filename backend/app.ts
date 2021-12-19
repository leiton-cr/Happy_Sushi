import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
require('dotenv').config();

import ingredientsRoutes from './app/routers/Ingredients.routes';
import coveragesRoutes from './app/routers/Coverages.routes';
import dishesRoutes from './app/routers/Dishes.routes';

const app: Application = express();
let port: String;

middlewares();
startup();
routes();
launch();

/**
 * Inicializaciones varias del servidor.
 */
function startup() {
  port = `${process.env.PORT}`;
}

/**
 * Intermediarios necesarios.
 */
function middlewares() {

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cors());
  app.use(express.static('./app/public'));
}

/**
 * Lanzamiento del servidor.
 */
function launch() {
  app.listen(port, () => console.log('Running on port', port));
}

/**
 * Enrutamiento de peticiones.
 */
function routes() {
  indexRoute();
  app.use('/api/Ingredients', ingredientsRoutes);
  app.use('/api/Coverages', coveragesRoutes);
  app.use('/api/Dishes', dishesRoutes);

  // Si no accedió a ninguna ruta conocida
  defaultRoute();
}


/**
 * Ruta si se accede a ./ 
 */
function indexRoute() {
  app.get('/', function (req, res) {
    const index_path = (`${__dirname}/public/index.html`).replace(`\\dist`,'');
    res.sendFile(index_path);
  });
}

/**
 * Ruta por defecto.
 */
function defaultRoute() {
  app.use((req, res) => {
    res.status(404).json({ status: 404, message: "Ruta no encontrada" });
  });
}
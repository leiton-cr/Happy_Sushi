import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

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
  dotenv.config();

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
  //app.use('/api/auth', authRoutes);


  // Si no accedió a ninguna ruta conocida
  defaultRoute();
}


/**
 * Ruta si se accede a ./ 
 */
function indexRoute() {
  app.get('/', function (req, res) {
    const index_path = (`${__dirname}/public/index.html`).replace(`\\dist`,'');
    console.log(index_path);
    
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
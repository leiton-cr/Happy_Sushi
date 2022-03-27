require('dotenv').config();

import Coverage from './app/models/Coverage';


import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import  Ingredient  from './app/models/Ingredient';
import ingredientsRoutes from './app/routers/Ingredients.routes';
import coveragesRoutes from './app/routers/Coverages.routes';
import dishesRoutes from './app/routers/Dishes.routes';

import db from './app/config/DB';
import Dish from './app/models/Dish';
import Roll from './app/models/Roll';
import { Model } from 'sequelize/dist';

const app: Application = express();
let port: String;



const dbConnection = async () =>{

  try {
    
    await db.authenticate();
    console.log('Database online');
    

  } catch (e) {
    console.log(e);
    
  }

}

dbConnection();

middlewares();
startup();
routes();
launch();

const test = async () => {

  
 // const coverages = await Coverage.create( {name: "Salmon", picture: new Buffer('123')} );
 // const coverages = await Coverage.findAll();
 //console.log(coverages);

 // const ingredients = await Ingredient.create( {name: "Salmona", picture: new Buffer('123'), type: "dish"} );
 // const ingredients = await Ingredient.findAll();
  //console.log(ingredients);

  
  //const dish = await Dish.create( {name: "Talmonela", picture: new Buffer('123'), price: "5000"} );

  /*

  const dish = await Dish.findByPk(1, {include: 'ingredients'});
  const ingredient = await Ingredient.findByPk(1);
  
  const d =  await dish?.addIngredient(2)
  console.log(d);
  

  
  

const dish = await Dish.findByPk(1, {include: ['ingredients']});
console.log(dish);
  //dish.addIngredient(ingredient)
*/
 //const roll = await Roll.create( {id: 1, tempura: true, coverage: 3} );
const roll:any = await Roll.findAll({include: ['dish', 'cover']});
console.log(roll);

    
 // dish.addIngredient()



}

test();


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
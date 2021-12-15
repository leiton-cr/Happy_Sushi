import { Router } from 'express';
import fileUpload from 'express-fileupload';
import IngredientController from '../controllers/Ingredients.controller';
import IngredientValidate from '../validation/Ingredients.validate';

const router: Router = Router();
const controller: IngredientController = new IngredientController();

// Permite la subida de archivos en el router.
router.use(fileUpload({
  createParentPath: true,
  limits: { },
}));

// Obtiene el listado general de los ingredientes.
router.get('/', controller.listAll);

// Obtiene el listado de los ingredientes por su tipo.
router.get('/by_Type/:type', IngredientValidate.validateByType, controller.listByType);

// Obtiene el listado de los ingredientes por su nombre.
router.get('/by_Name/:name', IngredientValidate.validateByName, controller.listByName);

// Obtiene la imagen de un ingrediente por su id.
router.get('/images/:id', IngredientValidate.validateById, controller.imageById);

// Obtiene un ingrediente por su id.
router.get('/:id', IngredientValidate.validateById, controller.listById);

// Ingresa un nuevo ingrediente.
router.post('/', IngredientValidate.validateInsert, controller.insert);

// Actualiza los datos de un ingrediente.
router.put('/:id', IngredientValidate.validateUpdate, controller.update);

// Elimina un ingrediente.
router.delete('/:id', IngredientValidate.validateById, controller.delete);

export default router;
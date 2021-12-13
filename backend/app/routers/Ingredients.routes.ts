import { Router } from 'express';
import fileUpload from 'express-fileupload';
import AuthController from '../controllers/Ingredients.controller';
import IngredientsValidate from '../validation/Ingredients.validate';

const router: Router = Router();
const controller: AuthController = new AuthController();

// Permite la subida de archivos en el router.
router.use(fileUpload({
  createParentPath: true,
  limits: { },
}));

// Obtiene el listado general de los ingredientes.
router.get('/', controller.listAll);

// Obtiene el listado de los ingredientes por su tipo.
router.get('/by_Type/:type', IngredientsValidate.validateByType, controller.listByType);

// Obtiene un ingrediente por su id.
router.get('/:id', IngredientsValidate.validateById, controller.listById);

// Ingresa un nuevo ingrediente.
router.post('/', IngredientsValidate.validateInsert, controller.insert);

// Actualiza los datos de un ingrediente.
router.put('/:id', IngredientsValidate.validateUpdate, controller.update);

// Elimina un ingrediente.
router.delete('/:id', IngredientsValidate.validateById, controller.delete);

export default router;
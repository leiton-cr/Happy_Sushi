import { Router } from 'express';
import fileUpload from 'express-fileupload';
import AuthController from '../controllers/Ingredients.controller';

const router: Router = Router();
const controller: AuthController = new AuthController();

router.use(fileUpload({
  createParentPath: true,
  limits: { },
}));

// Obtiene el listado general de los ingredientes.
router.get('/', controller.listAll);

// Obtiene el listado de los ingredientes por su tipo.
router.get('/by_Type/:type', controller.listByType);

// Obtiene un ingrediente por su id.
router.get('/:id', controller.listById);

// Ingresa un nuevo ingrediente.
router.post('/', controller.insert);

// Actualiza los datos de un ingrediente.
router.put('/:id', controller.update);

// Elimina un ingrediente.
router.delete('/:id', controller.delete);

//TODO: Validaciones
export default router;
import { Router } from 'express';

import AuthController from '../controllers/Ingredients.controller';

const router: Router = Router();
const controller: AuthController = new AuthController();

// Obtiene el listado general de los ingredientes.
router.get('/', controller.listAll);

// Obtiene el listado de los ingredientes por su tipo.
router.get('/by_Type/:type', controller.listByType);

// Obtiene un ingrediente por su id.
router.get('/:id', controller.listById);

// Ingresa un nuevo ingrediente.
router.post('/', controller.listAll);

// Actualiza los datos de un ingrediente.
router.put('/', controller.listAll);

// Elimina un ingrediente.
router.delete('/:id', controller.listAll);

export default router;
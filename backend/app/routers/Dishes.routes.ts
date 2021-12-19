import { Router } from 'express';
import fileUpload from 'express-fileupload';
import DishController from '../controllers/Dish.controller';
import DishValidate from '../validation/Dishes.validate';

const router: Router = Router();
const controller: DishController = new DishController();

// Permite la subida de archivos en el router.
router.use(fileUpload({
  createParentPath: true,
  limits: { },
}));

// Obtiene el listado general de los platillos.
router.get('/', controller.listAll);

// Obtiene el listado de los platillos por su nombre.
router.get('/by_Name/:name', DishValidate.validateByName, controller.listByName);

// Obtiene la imagen de un platillo por su id.
router.get('/images/:id', DishValidate.validateById, controller.imageById);

// Obtiene un platillo por su id.
router.get('/:id', DishValidate.validateById, controller.listById);

// Ingresa un nuevo platillo.
router.post('/', DishValidate.validateInsert, controller.insert);

// Actualiza los datos de un platillo.
router.put('/:id', DishValidate.validateUpdate, controller.update);

// Elimina un platillo.
router.delete('/:id', DishValidate.validateById, controller.delete);

export default router;
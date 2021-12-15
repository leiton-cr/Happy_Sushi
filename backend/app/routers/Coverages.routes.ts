import { Router } from 'express';
import fileUpload from 'express-fileupload';
import CoverageController from '../controllers/Coverage.controller';
import CoverageValidate from '../validation/Coverages.validate';

const router: Router = Router();
const controller: CoverageController = new CoverageController();

// Permite la subida de archivos en el router.
router.use(fileUpload({
  createParentPath: true,
  limits: { },
}));

// Obtiene el listado general de los ingredientes.
router.get('/', controller.listAll);

// Obtiene el listado de los ingredientes por su nombre.
router.get('/by_Name/:name', CoverageValidate.validateByName, controller.listByName);

// Obtiene la imagen de un ingrediente por su id.
router.get('/images/:id', CoverageValidate.validateById, controller.imageById);

// Obtiene un ingrediente por su id.
router.get('/:id', CoverageValidate.validateById, controller.listById);

// Ingresa un nuevo ingrediente.
router.post('/', CoverageValidate.validateInsert, controller.insert);

// Actualiza los datos de un ingrediente.
router.put('/:id', CoverageValidate.validateUpdate, controller.update);

// Elimina un ingrediente.
router.delete('/:id', CoverageValidate.validateById, controller.delete);

export default router;
import { Request, Response, NextFunction } from "express";
import Validation from "../utils/Validation";

const errorMessages = {
  name: 'Falló la verificación del nombre',
  id: 'Falló la verificación del id',
  picture: 'Falló la verificación de la foto',
  type: 'Falló la verificación del tipo'
}

const validate: Validation = new Validation();

/**
 * Esta clase verifica los parámetros enviados por el request.
 */
class IngredientsValidate {

  // Metodo de verificacion por id
  static validateById(req: Request, res: Response, next: NextFunction) {
    if (verifyId(req)) return res.status(400).json({ message: errorMessages.id });
    next();
  }

  // Metodo de verificacion por tipo
  static validateByType(req: Request, res: Response, next: NextFunction) {
    if (verifyType(req)) return res.status(400).json({ message: errorMessages.type });
    next();
  }

    // Metodo de verificacion por nombre
    static validateByName(req: Request, res: Response, next: NextFunction) {
      if (verifyName(req)) return res.status(400).json({ message: errorMessages.name });
      next();
    }

  // Metodo de verificacion para parametros de insert
  static validateInsert(req: Request, res: Response, next: NextFunction) {
    if (verifyName(req)) return res.status(400).json({ message: errorMessages.name });
    if (verifyType(req)) return res.status(400).json({ message: errorMessages.type });
    if (verifyPicture(req)) return res.status(400).json({ message: errorMessages.picture });
    next();
  }

  // Metodo de verificacion para parametros de update
  static validateUpdate(req: Request, res: Response, next: NextFunction) {
    if (verifyId(req)) return res.status(400).json({ message: errorMessages.id });
    if (verifyName(req)) return res.status(400).json({ message: errorMessages.name });
    if (verifyType(req)) return res.status(400).json({ message: errorMessages.type });
    if (req.files) {
      if (verifyPicture(req)) return res.status(400).json({ message: errorMessages.picture });
    }
    
    next();
  }
}

const verifyId = (req: Request) => {
  const { id } = req.params;
  
  if(!!!id) return true;
  return idVerifications(id).some(element => !element);
}

// Metodo para obtener arreglo de verificaciones de nombre.
const idVerifications = (id: string): Array<Boolean> => [
  validate.verifyNumber(id),
  validate.verifyPositive(parseInt(id, 10)),
  validate.verifyMaxNumber(parseInt(id, 10), 255)
];

const verifyName = (req: Request) => {
  const { name } = !!req.body.name ? req.body : req.params;
  
  if(!!!name) return true;
  return nameVerifications(name).some(element => !element);
}

// Metodo para obtener arreglo de verificaciones de nombre.
const nameVerifications = (name: string): Array<Boolean> => [
  validate.verifyMinSize(name, 3),
  validate.verifyMaxSize(name, 25),
  validate.verifySpecialCharacters(name),
  validate.verifyText(name),
];

const verifyType = (req: Request) => {
  const { type } = req.body.type ? req.body : req.params;

  if(!!!type) return true;
  return typeVerifications(type).some(element => !element);
}

// Metodo para obtener arreglo de verificaciones de tipo.
const typeVerifications = (type: string) => [
  validate.verifyIngredientType(type.toLowerCase())
];

const verifyPicture = (req: Request) => {
  const picture: any = req.files!.picture;

  if(!!!picture) return true;
  return pictureVerifications(picture).some(element => !element);
}

// Metodo para obtener arreglo de verificaciones de foto.
const pictureVerifications = (picture: any) => [
  validate.verifyImageSize(picture.size),
  validate.verifyImageType(picture.mimetype)
];

export default IngredientsValidate
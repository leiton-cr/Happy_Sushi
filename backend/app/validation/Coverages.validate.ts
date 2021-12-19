import { Request, Response, NextFunction } from "express";
import Validation from "../utils/Validation";

const errorMessages = {
  name: "Falló la verificación del nombre",
  id: "Falló la verificación del id",
  picture: "Falló la verificación de la foto",
};

const validate: Validation = new Validation();

/**
 * Esta clase verifica los parámetros enviados por el request.
 */
class CoveragesValidate {
  // Metodo de verificacion por id
  static validateById(req: Request, res: Response, next: NextFunction) {
    if (verifyId(req))
      return res.status(400).json({ message: errorMessages.id });

    next();
  }

  // Metodo de verificacion por nombre
  static validateByName(req: Request, res: Response, next: NextFunction) {
    if (verifyName(req))
      return res.status(400).json({ message: errorMessages.name });

    next();
  }

  // Metodo de verificacion para parametros de insert
  static validateInsert(req: Request, res: Response, next: NextFunction) {
    if (verifyName(req))
      return res.status(400).json({ message: errorMessages.name });

    if (verifyPicture(req))
      return res.status(400).json({ message: errorMessages.picture });

    next();
  }

  // Metodo de verificacion para parametros de update
  static validateUpdate(req: Request, res: Response, next: NextFunction) {
    if (verifyId(req))
      return res.status(400).json({ message: errorMessages.id });

    if (verifyName(req))
      return res.status(400).json({ message: errorMessages.name });

    if (req.files) {
      if (verifyPicture(req))
        return res.status(400).json({ message: errorMessages.picture });
    }
    
    next();
  }
}

const verifyId = (req: Request) => {
  const { id } = req.params;
  return !!!id ? true : idVerifications(id).includes(false);
};

const verifyName = (req: Request) => {
  const { name } = !!req.body.name ? req.body : req.params;
  return !!!name ? true : nameVerifications(name).includes(false);
};

const verifyPicture = (req: Request) => {
  const picture: any = req.files!.picture;
  return !!!picture ? true : pictureVerifications(picture).includes(false);
};

// Metodo para obtener arreglo de verificaciones de nombre.
const idVerifications = (id: string): Array<Boolean> => [
  validate.verifyNumber(id),
  validate.verifyPositive(parseInt(id)),
  validate.verifyMaxNumber(parseInt(id), 255),
];

// Metodo para obtener arreglo de verificaciones de nombre.
const nameVerifications = (name: string): Array<Boolean> => [
  validate.verifyMinSize(name, 3),
  validate.verifyMaxSize(name, 25),
  validate.verifySpecialCharacters(name),
  validate.verifyText(name),
];

// Metodo para obtener arreglo de verificaciones de foto.
const pictureVerifications = (picture: any) => [
  validate.verifyImageSize(picture.size),
  validate.verifyImageType(picture.mimetype),
];

export default CoveragesValidate;
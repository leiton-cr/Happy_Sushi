import { Request, Response } from "express";
import IngredientService from "../services/Ingredients.service";

const service: IngredientService = new IngredientService();

class AuthController {

  // Metodo de obtencion de lista general
  async listAll(req: Request, res: Response) {
    const data: ServiceResult = await service.listAll();
    res.status(data.status).json({ message: data.message, list: data.list });
  }

  // Metodo de obtencion de lista por id
  async listById(req: Request, res: Response) {
    const { id } = req.params;
    const data: ServiceResult = await service.listById(parseInt(id, 10));
    res.status(data.status).json({ message: data.message, item: data.item });
  }

  // Metodo de obtencion de lista por id
  async listByType(req: Request, res: Response) {
    const { type } = req.params;
    const data: ServiceResult = await service.listByType(type);
    res.status(data.status).json({ list: data.list });
  }

  // Metodo de eliminacion por id
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const data: ServiceResult = await service.delete(parseInt(id, 10));
    res.status(data.status).json({ message: data.message });
  }

  // Metodo de insercion de ingrediente
  async insert(req: Request, res: Response) {
    const { name, type } = req.body;
    const picture:any  = req.files!.picture;

    const data: ServiceResult = await service.insert(name, type, picture.data);
    res.status(data.status).json({ message: data.message });
  }

    // Metodo de actualizacion de ingrediente
    async update(req: Request, res: Response) {
      const { id } = req.params;
      const { name, type } = req.body;
      const picture:any  = req.files!.picture;
  
      const data: ServiceResult = await service.update(parseInt(id),name, type, picture.data);
      res.status(data.status).json({ message: data.message });
    }

}

export default AuthController
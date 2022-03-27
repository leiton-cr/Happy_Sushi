import { Request, Response } from "express";
import DishService from "../services/Dishes.service";

const service: DishService = new DishService();

class AuthController {
  // Metodo de obtencion de lista general
  async listAll(req: Request, res: Response) {
    const data: ServiceResult = await service.listAll();
    res.status(data.status).json(data);
  }

  // Metodo de obtencion de lista por id
  async listById(req: Request, res: Response) {
    const { id } = req.params;
    const data: ServiceResult = await service.listById(parseInt(id));
    res.status(data.status).json(data);
  }

  // Metodo de obtencion de lista por id
  async listByName(req: Request, res: Response) {
    const { name } = req.params;
    const data: ServiceResult = await service.listByName(name);
    res.status(data.status).json(data);
  }

  // Metodo de eliminacion por id
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const data: ServiceResult = await service.delete(parseInt(id));
    res.status(data.status).json(data);
  }

  // Metodo de insercion de ingrediente
  async insert(req: Request, res: Response) {
    const { name, price, ingredients } = req.body;
    const picture: any = req.files!.picture;

    const data: ServiceResult = await service.insert(name, price, ingredients, picture.data);
    res.status(data.status).json(data);
  }

  // Metodo de actualizacion de ingrediente
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, price, ingredients } = req.body;
    const picture: any = req.files?.picture;

    const data: ServiceResult = await service.update(parseInt(id), name, price, ingredients, picture?.data);    
      res.status(data.status).json(data);
  }

  // Metodo de actualizacion de ingrediente
  async imageById(req: Request, res: Response) {
    const { id } = req.params;
    const data: ServiceResult = await service.imageById(parseInt(id));
    res.status(data.status).json(data);
  }



}

export default AuthController;
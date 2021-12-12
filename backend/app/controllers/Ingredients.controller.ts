import { Request, Response } from "express";
import AuthService from "../services/Ingredients.service";

const service: AuthService = new AuthService();

class AuthController {

  // Metodo de obtencion de lista general
  async listAll(req: Request, res: Response) {
    const data: ServiceResult = await service.listAll();
    res.status(data.status).json({ message: data.message });
  }

  // Metodo de obtencion de lista por id
  async listById(req: Request, res: Response) {
    const { id } = req.params;
    const data: ServiceResult = await service.listById(parseInt(id, 10));
    res.status(data.status).json({ message: data.message });
  }

  // Metodo de obtencion de lista por id
  async listByType(req: Request, res: Response) {
    const { type } = req.params;
    const data: ServiceResult = await service.listByType(type);
    res.status(data.status).json({ message: data.message });
  }

}

export default AuthController
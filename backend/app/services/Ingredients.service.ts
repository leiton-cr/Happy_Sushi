import Ingredient from '../models/Ingredient';

import AbstractService from "./Abstract.service";

/**
 *  Esta clase controla peticiones a DB 
 *  relacionadas con tabla de Ingredientes  
 */
class IngredientService extends AbstractService {

  public constructor() {
    super();
  }

  async listAll() {

    try {
      const ingredients = await Ingredient.findAll({
        attributes: { exclude: ['picture', 'state'] },
        where: { state: true }
      });

      this.result = { status: 200, list: ingredients }

    } catch (error) {
      this.result = { status: 500, message: 'Surgió un error al obtener los datos' }

    } finally {
      return this.result;
    }

  }

  async listById(id: number) {

    try {
      const ingredient = await Ingredient.findOne({
        attributes: { exclude: ['picture', 'state'] },
        where: { id: id, state: true }
      });

      if (!ingredient) {
        this.result = { status: 404, message: `No se encontró el ingrediente con id ${id}` };

      } else {
        this.result = { status: 200, item: ingredient }
      }

    } catch (error) {
      this.result = { status: 500, message: `Surgió un error al obtener el ingrediente` }

    } finally {
      return this.result;
    }
  }

  async listByName(name: string) {

    try {
      const ingredient = await Ingredient.findOne({
        attributes: { exclude: ['picture', 'state'] },
        where: { name: name, state: true }
      });

      if (!ingredient) {
        this.result = { status: 404, message: `No se encontró el ingrediente con el nombre ${name}` };

      } else {
        this.result = { status: 200, item: ingredient }
      }

    } catch (error) {
      this.result = { status: 500, message: `Surgió un error al obtener el ingrediente` }

    } finally {
      return this.result;
    }
  }

  async listByType(type: string) {

    try {
      const ingredient = await Ingredient.findAll({
        attributes: { exclude: ['picture', 'state'] },
        where: { type: type, state: true }
      });

      if (!ingredient) {
        this.result = { status: 404, message: `No se encontraron ingredientes con el tipo ${type}` };

      } else {
        this.result = { status: 200, list: ingredient }
      }

    } catch (error) {
      this.result = { status: 500, message: `Surgió un error al obtener los ingredientes` }

    } finally {
      return this.result;
    }
  }


  async insert(name: String, type:String , picture: Buffer) {
    try {
      const cover = Ingredient.build({ name: name, type: type, picture: picture});
      const res = await cover.save();
      this.result = { status: 200, item: res };
    } catch (error) {
      this.result = { status: 500, message: `Surgió un error al guardar el ingrediente` }

    } finally {
      return this.result;
    }
  }

  async delete(id: number) {

    try {
      const ingredient = await Ingredient.findOne({
        attributes: { exclude: ['picture', 'state'] },
        where: { id: id, state: true }
      });

      if (ingredient) {

        await ingredient.update({ state: false })
        this.result = { status: 200, item: ingredient }

      } else {
        this.result = { status: 404, message: `No se encontró el ingrediente con id ${id}` }
      }

    } catch (error) {
      this.result = { status: 500, message: `Surgió un error al eliminar el ingrediente` }
    } finally {
      return this.result
    }
  }

  async update(id: number, name: String, type: String, picture: Buffer) {

    try {
      const ingredient = await Ingredient.findOne({
        attributes: { exclude: ['picture', 'state'] },
        where: { id: id, state: true }
      });

      if (ingredient) {

        !!picture ?
          await ingredient.update({ name: name, picture: picture, type:type }) :
          await ingredient.update({ name: name, type:type });
        this.result = { status: 200, item: ingredient }

      } else {
        this.result = { status: 404, message: `No se encontró el ingrediente con id ${id}` }
      }

    } catch (error) {
      console.log(error);
      this.result = { status: 500, message: `Surgió un error al modificar el ingrediente` }

    } finally {
      return this.result
    }
  }

  async imageById(id: number) {

    try {
      const ingredient: any = await Ingredient.findOne({
        attributes: { include: ['picture'] },
        where: { id: id, state: true }
      });

      if (!ingredient) {
        this.result = { status: 404, message: `No se encontró el ingrediente con id ${id}` };

      } else {
        this.result = { status: 200, item: `data:image/webp;base64,${ingredient.picture.toString('base64')}` };
      }

    } catch (error) {
      this.result = { status: 500, message: `Surgió un error al obtener el ingrediente` }

    } finally {
      return this.result;
    }
  }
}

export default IngredientService;
import Ingredient from '../models/Ingredient';
import Dish from '../models/Dish';
import sql, { MAX } from 'mssql';

import AbstractService from "./Abstract.service";
import db from '../config/DB';

/**
 *  Esta clase controla peticiones a DB 
 *  relacionadas con tabla de Platillos  
 */
class DishesService extends AbstractService {

  public constructor() { super() };

  async insert(name: string, price: number, ingredients: string, picture: Buffer) {

    const procedure: string = 'sp_dishes_insert';

    const inputData: Array<DataField> = [
      { name: 'name', type: sql.VarChar(25), data: name },
      { name: 'price', type: sql.Int, data: price },
      { name: 'ingredients', type: sql.VarChar(250), data: ingredients },
      { name: 'picture', type: sql.VarBinary(MAX), data: picture },
    ]

    const outputData = await this.db.obtainData(inputData, procedure);

    // Si no hay datos.
    if (!outputData) {
      return this.result = { status: 500, message: `Surgió un error al registrar el platillo` }
    }

    // Si hay datos.
    if (outputData.rowsAffected[0] > 0) {
      return this.result = { status: 200, message: `Se insertó correctamente el platillo` }
    }
    return this.result = { status: 400, message: `No se insertó el platillo` }
  }

  async update(id: number, name: String, price: number, ingredients: string, picture: Buffer) {

    const procedure = !!picture ? 'sp_dishes_update' : 'sp_dishes_update_pictureless';

    const inputData: Array<DataField> = [
      { name: 'id', type: sql.TinyInt, data: id },
      { name: 'name', type: sql.VarChar(25), data: name },
      { name: 'price', type: sql.Int, data: price },
      { name: 'ingredients', type: sql.VarChar(250), data: ingredients },
    ]

    if (!!picture)
      inputData.push({ name: 'picture', type: sql.VarBinary(MAX), data: picture });

    const outputData = await this.db.obtainData(inputData, procedure);

    // Si no hay datos.
    if (!outputData) {
      return this.result = { status: 500, message: `Surgió un error al actualizar el platillo` }
    }

    // Si hay datos.
    if (outputData.rowsAffected[0] > 0) {
      return this.result = { status: 200, message: `Se actualizó correctamente el platillo` }
    }

    return this.result = { status: 400, message: `No se encontró el platillo a actualizar` }
  }














  async listAll() {
    try {
      const dishes = await Dish.findAll(
        {
          attributes: { exclude: ['picture'] },
          include:
            [{
              model: Ingredient,
              as: 'ingredients',
              attributes: {
                exclude: ['picture']
              }
            }],
        })

      this.result = { status: 200, list: dishes }
    } catch (error) {
      this.result = { status: 500, message: `Surgió un error al obtener los datos` }
    } finally {
      return this.result
    }
  }

  async listById(id: number) {
    try {
      const dishes = await Dish.findOne(
        {
          attributes: {
            exclude: ['picture']
          },
          where: { id: id, state: true },
          include:
            [{
              model: Ingredient,
              as: 'ingredients',
              attributes: { exclude: ['picture'] }
            }],
        })

      this.result = !dishes ?
        { status: 404, message: `No se encontró el platillo con id ${id}` } :
        { status: 200, item: dishes };

    } catch (error) {
      this.result = { status: 500, message: `Surgió un error al obtener los datos` };

    } finally {
      return this.result;
    }
  }

  async listByName(name: string) {
    try {
      const dishes = await Dish.findOne(
        {
          attributes: {
            exclude: ['picture']
          },
          where: { name: name, state: true },
          include:
            [{
              model: Ingredient,
              as: 'ingredients',
              attributes: { exclude: ['picture'] }
            }],
        })

      this.result = !dishes ?
        { status: 404, message: `No se encontró el platillo ${name}` } :
        { status: 200, item: dishes };

    } catch (error) {
      this.result = { status: 500, message: `Surgió un error al obtener los datos` };

    } finally {
      return this.result;
    }
  }

  async imageById(id: number) {
    try {
      const dish: any = await Dish.findOne(
        {
          attributes: {
            include: ['picture']
          },
          where: { id: id, state: true }
        })

      this.result = !dish ?
        { status: 404, message: `No se encontró el platillo con id ${id}` } :
        { status: 200, item: `data:image/webp;base64,${dish.picture.toString('base64')}` };

    } catch (error) {
      this.result = { status: 500, message: `Surgió un error al obtener los datos` };

    } finally {
      return this.result;
    }
  }





  async delete(id: number) {
    try {
      const dish: any = await Dish.findOne(
        {
          attributes: {
            exclude: ['picture']
          },
          where: { id: id, state: true }
        })

      if (!dish) {
        this.result = { status: 404, message: `No se encontró el platillo con id ${id}` }
      } else {
        await dish.update({ state: false })
        this.result = { status: 200, item: dish }
      }

    } catch (error) {
      this.result = { status: 500, message: `Surgió un error al obtener los datos` };

    } finally {
      return this.result;
    }
  }





  async inse(name: string, price:number, picture:Buffer) {

    
    const dish = await Dish.create({name, price,picture});



      this.result = { status: 500, message: `Surgió un error al obtener los datos` };

    
      return this.result;
  
  }








}

export default DishesService;
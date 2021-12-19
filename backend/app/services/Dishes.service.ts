import sql, { MAX } from 'mssql';

import AbstractService from "./Abstract.service";

/**
 *  Esta clase controla peticiones a DB 
 *  relacionadas con tabla de Platillos  
 */
class DishesService extends AbstractService {

  public constructor() {
    super();
  }

  async listAll() {

    const procedure: string = 'sp_dishes_list_all'
    const outputData = await this.db.obtainData([], procedure)
    
    // Si no hay datos.
    if (!outputData) {
      return this.result = { status: 500, message: 'Surgió un error al obtener los platillos' }
    }
 
    // Si hay datos.
    if (outputData.recordset.length !== 0) {
      return this.result = { status: 200, list: outputData.recordset }
    }
    return this.result = { status: 400, message: 'No hay platillos que mostrar' }
  }

  async listById(id:Number) {
   
    const procedure: string = 'sp_dishes_list_byId'

    const inputData: Array<DataField> = [
      { name: 'id', type: sql.TinyInt, data: id }
    ]

    const outputData = await this.db.obtainData(inputData, procedure)
    
    // Si no hay datos.
    if (!outputData) 
      return this.result = { status: 500, message: 'Surgió un error al obtener el platillo' }
    
 
    // Si hay datos.
    if (outputData.recordset.length !== 0) {
      return this.result = { status: 200, item: outputData.recordset[0] }
    }
    return this.result = { status: 400, message: 'El platillo no fue encontrado' }
  }
  
  async listByName(name:String) {
   
    const procedure: string = 'sp_dishes_list_byName'

    const inputData: Array<DataField> = [
      { name: 'name', type: sql.VarChar(25), data: name }
    ]

    const outputData = await this.db.obtainData(inputData, procedure)
    
    // Si no hay datos.
    if (!outputData) {
      return this.result = { status: 500, message: 'Surgió un error al obtener el platillo' }
    }
 
    // Si hay datos.
    if (outputData.recordset.length !== 0) {
      return this.result = { status: 200, item: outputData.recordset[0] }
    }
    return this.result = { status: 400, message: 'El platillo no fue encontrado' }
  }

  async delete(id:number) {
   
    const procedure: string = 'sp_dishes_delete';

    const inputData: Array<DataField> = [
      { name: 'id', type: sql.TinyInt, data: id }
    ]

    const outputData = await this.db.obtainData(inputData, procedure);
    
    // Si no hay datos.
    if (!outputData) {
      return this.result = { status: 500, message: `Surgió un error al eliminar el platillo '${id}'` }
    }
  
    // Si hay datos.
    if (outputData.rowsAffected[0] > 0) {
      return this.result = { status: 200, message: `Se eliminó correctamente el platillo '${id}'` }
    }
    return this.result = { status: 400, message: `No se encontró el platillo '${id}' a eliminar` }
  }

  async insert(name:string, price:number, ingredients:string, picture:Buffer) {
   
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

  async update(id:number, name:String,price:number, ingredients:string, picture:Buffer) {
   
    const procedure = !!picture ? 'sp_dishes_update' : 'sp_dishes_update_pictureless';
  
    const inputData: Array<DataField> = [
      { name: 'id', type: sql.TinyInt, data: id },
      { name: 'name', type: sql.VarChar(25), data: name },
      { name: 'price', type: sql.Int, data: price },
      { name: 'ingredients', type: sql.VarChar(250), data: ingredients },
    ]

    if(!!picture) 
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

  async imageById(id:Number) {
   
    const procedure: string = 'sp_dishes_image_byId'

    const inputData: Array<DataField> = [
      { name: 'id', type: sql.TinyInt, data: id }
    ]

    const outputData = await this.db.obtainData(inputData, procedure)
    
    // Si no hay datos.
    if (!outputData) {
      return this.result = { status: 500, message: 'Surgió un error al obtener la imagen de el platillo' }
    }
 
    // Si hay datos.
    if (outputData.recordset.length !== 0) {
      return this.result = { status: 200, item: `data:image/webp;base64,${ outputData.recordset[0].picture.toString('base64')}` }
    }
    return this.result = { status: 400, message: 'La imagen de el platillo no fue encontrada' }
  }

}

export default DishesService;
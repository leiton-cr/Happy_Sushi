import sql, { MAX } from 'mssql';

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

    const procedure: string = 'sp_ingredients_list_all'
    const outputData = await this.db.obtainData([], procedure)
    
    // Si no hay datos.
    if (!outputData) {
      return this.result = { status: 500, message: 'Surgió un error al obtener los ingredientes' }
    }
 
    // Si hay datos.
    if (outputData.recordset.length !== 0) {
      return this.result = { status: 200, list: outputData.recordset }
    }
    return this.result = { status: 400, message: 'No hay ingredientes que mostrar' }
  }

  async listById(id:Number) {
   
    const procedure: string = 'sp_ingredients_list_byId'

    const inputData: Array<DataField> = [
      { name: 'id', type: sql.TinyInt, data: id }
    ]

    const outputData = await this.db.obtainData(inputData, procedure)
    
    // Si no hay datos.
    if (!outputData) {
      return this.result = { status: 500, message: 'Surgió un error al obtener el ingrediente' }
    }
 
    // Si hay datos.
    if (outputData.recordset.length !== 0) {
      return this.result = { status: 200, item: outputData.recordset[0] }
    }
    return this.result = { status: 400, message: 'El ingrediente no fue encontrado' }
  }

  async listByType(type:String) {
   
    const procedure: string = 'sp_ingredients_list_byType';

    const inputData: Array<DataField> = [
      { name: 'type', type: sql.VarChar(4), data: type }
    ]

    const outputData = await this.db.obtainData(inputData, procedure);

    // Si no hay datos.
    if (!outputData) {
      return this.result = { status: 500, message: `Surgió un error al obtener los ingredientes de tipo '${type}'` }
    }
 
    // Si hay datos.
    if (outputData.recordset.length !== 0) {
      return this.result = { status: 200, list: outputData.recordset }
    }
    return this.result = { status: 400, message: `No se encontraron ingredientes de tipo '${type}'` }
  }

  async delete(id:number) {
   
    const procedure: string = 'sp_ingredients_delete';

    const inputData: Array<DataField> = [
      { name: 'id', type: sql.TinyInt, data: id }
    ]

    const outputData = await this.db.obtainData(inputData, procedure);
    
    // Si no hay datos.
    if (!outputData) {
      return this.result = { status: 500, message: `Surgió un error al eliminar el ingrediente '${id}'` }
    }
 
    // Si hay datos.
    if (outputData.rowsAffected.length !== 0) {
      return this.result = { status: 200, message: `Se eliminó correctamente el ingrediente '${id}'` }
    }
    return this.result = { status: 400, message: `No se encontró el ingrediente '${id}' a eliminar` }
  }

  async insert(name:String, type:String, picture:Buffer) {
   
    const procedure: string = 'sp_ingredients_insert';

    const inputData: Array<DataField> = [
      { name: 'name', type: sql.VarChar(25), data: name },
      { name: 'type', type: sql.VarChar(4), data: type },
      { name: 'picture', type: sql.VarBinary(MAX), data: picture },
    ]

    const outputData = await this.db.obtainData(inputData, procedure);

    // Si no hay datos.
    if (!outputData) {
      return this.result = { status: 500, message: `Surgió un error al registrar el ingrediente` }
    }
 
    // Si hay datos.
    if (outputData.rowsAffected[0] !== 0) {
      return this.result = { status: 200, message: `Se insertó correctamente el ingrediente` }
    }
    return this.result = { status: 400, message: `No se insertó ingrediente` }
  }

  async update(id:number, name:String, type:String, picture:Buffer) {
   
    const procedure: string = 'sp_ingredients_update';

    const inputData: Array<DataField> = [
      { name: 'id', type: sql.TinyInt, data: id },
      { name: 'name', type: sql.VarChar(25), data: name },
      { name: 'type', type: sql.VarChar(4), data: type },
      { name: 'picture', type: sql.VarBinary(MAX), data: picture },
    ]

    const outputData = await this.db.obtainData(inputData, procedure);

    // Si no hay datos.
    if (!outputData) {
      return this.result = { status: 500, message: `Surgió un error al actualizar el ingrediente` }
    }
 
    // Si hay datos.
    if (outputData.rowsAffected[0] !== 0) {
      return this.result = { status: 200, message: `Se actualizó correctamente el ingrediente` }
    }
    return this.result = { status: 400, message: `No se actualizó ingrediente` }
  }

}
export default IngredientService;
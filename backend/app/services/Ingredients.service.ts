import sql from 'mssql';

import AbstractService from "./Abstract.service";

/**
  *  Esta clase controla peticiones a DB 
  *  relacionadas con tabla de Ingredientes
  */
class AuthService extends AbstractService {

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
      return this.result = { status: 200, list: outputData.recordset[0] }
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
}

export default AuthService;
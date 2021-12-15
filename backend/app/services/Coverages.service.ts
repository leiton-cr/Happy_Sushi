import sql, { MAX } from 'mssql';

import AbstractService from "./Abstract.service";

/**
 *  Esta clase controla peticiones a DB 
 *  relacionadas con tabla de Coverturas  
 */
class CoveragesService extends AbstractService {

  public constructor() {
    super();
  }

  async listAll() {

    const procedure: string = 'sp_coverages_list_all'
    const outputData = await this.db.obtainData([], procedure)
    
    // Si no hay datos.
    if (!outputData) {
      return this.result = { status: 500, message: 'Surgió un error al obtener las coverturas' }
    }
 
    // Si hay datos.
    if (outputData.recordset.length !== 0) {
      return this.result = { status: 200, list: outputData.recordset }
    }
    return this.result = { status: 400, message: 'No hay coverturas que mostrar' }
  }

  async listById(id:Number) {
   
    const procedure: string = 'sp_coverages_list_byId'

    const inputData: Array<DataField> = [
      { name: 'id', type: sql.TinyInt, data: id }
    ]

    const outputData = await this.db.obtainData(inputData, procedure)
    
    // Si no hay datos.
    if (!outputData) {
      return this.result = { status: 500, message: 'Surgió un error al obtener la covertura' }
    }
 
    // Si hay datos.
    if (outputData.recordset.length !== 0) {
      return this.result = { status: 200, item: outputData.recordset[0] }
    }
    return this.result = { status: 400, message: 'La covertura no fue encontrada' }
  }
  
  async listByName(name:String) {
   
    const procedure: string = 'sp_coverages_list_byName'

    const inputData: Array<DataField> = [
      { name: 'name', type: sql.VarChar(25), data: name }
    ]

    const outputData = await this.db.obtainData(inputData, procedure)
    
    // Si no hay datos.
    if (!outputData) {
      return this.result = { status: 500, message: 'Surgió un error al obtener la covertura' }
    }
 
    // Si hay datos.
    if (outputData.recordset.length !== 0) {
      return this.result = { status: 200, item: outputData.recordset[0] }
    }
    return this.result = { status: 400, message: 'La covertura no fue encontrada' }
  }

  async delete(id:number) {
   
    const procedure: string = 'sp_coverages_delete';

    const inputData: Array<DataField> = [
      { name: 'id', type: sql.TinyInt, data: id }
    ]

    const outputData = await this.db.obtainData(inputData, procedure);
    
    // Si no hay datos.
    if (!outputData) {
      return this.result = { status: 500, message: `Surgió un error al eliminar la covertura '${id}'` }
    }
    
    // Si hay datos.
    if (outputData.rowsAffected[0] !== 0) {
      return this.result = { status: 200, message: `Se eliminó correctamente la covertura '${id}'` }
    }
    return this.result = { status: 400, message: `No se encontró la covertura '${id}' a eliminar` }
  }

  async insert(name:String, picture:Buffer) {
   
    const procedure: string = 'sp_coverages_insert';

    const inputData: Array<DataField> = [
      { name: 'name', type: sql.VarChar(25), data: name },
      { name: 'picture', type: sql.VarBinary(MAX), data: picture },
    ]

    const outputData = await this.db.obtainData(inputData, procedure);

    // Si no hay datos.
    if (!outputData) {
      return this.result = { status: 500, message: `Surgió un error al registrar la covertura` }
    }
 
    // Si hay datos.
    if (outputData.rowsAffected[0] !== 0) {
      return this.result = { status: 200, message: `Se insertó correctamente la covertura` }
    }
    return this.result = { status: 400, message: `No se insertó la covertura` }
  }

  async update(id:number, name:String, picture:Buffer) {
   
    const procedure = !!picture ? 'sp_coverages_update' : 'sp_coverages_update_pictureless';
    
    const inputData: Array<DataField> = [
      { name: 'id', type: sql.TinyInt, data: id },
      { name: 'name', type: sql.VarChar(25), data: name }
    ]

    if(!!picture) inputData.push({ name: 'picture', type: sql.VarBinary(MAX), data: picture });
    
    const outputData = await this.db.obtainData(inputData, procedure);

    // Si no hay datos.
    if (!outputData) {
      return this.result = { status: 500, message: `Surgió un error al actualizar la coverutra` }
    }
 
    // Si hay datos.
    if (outputData.rowsAffected[0] !== 0) {
      return this.result = { status: 200, message: `Se actualizó correctamente la coverutra` }
    }
    return this.result = { status: 400, message: `No se encontró la coverutra a actualizar` }
  }

  async imageById(id:Number) {
   
    const procedure: string = 'sp_coverages_image_byId'

    const inputData: Array<DataField> = [
      { name: 'id', type: sql.TinyInt, data: id }
    ]

    const outputData = await this.db.obtainData(inputData, procedure)
    
    // Si no hay datos.
    if (!outputData) {
      return this.result = { status: 500, message: 'Surgió un error al obtener la imagen de la covertura' }
    }
 
    // Si hay datos.
    if (outputData.recordset.length !== 0) {
      return this.result = { status: 200, item: `data:image/webp;base64,${ outputData.recordset[0].picture.toString('base64')}` }
    }
    return this.result = { status: 400, message: 'La imagen de la covertura no fue encontrada' }
  }


}
export default CoveragesService;
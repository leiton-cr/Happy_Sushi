/**
  *  Contiene la estructura de datos que será retornada al cliente.
  */
interface ServiceResult {

  status: number, 
  message?: string,
  list?: Array<any>,
  item?: any
};
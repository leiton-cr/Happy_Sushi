/**
  *  Contiene la estructura de datos que será retornada al cliente.
  */
interface ServiceResult {

  message?: string,
  list?: Array<any>,
  item?: any
};
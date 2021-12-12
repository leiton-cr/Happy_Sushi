/**
 *  Interfaz de objetos para consultas SQL
 */
interface DataField {

  /**
   * Nombre de este parametro en la base de datos
   */
  name: string,

  /**
   * Tipo en la base de datos SQL
   */
  type: any,

  /**
   * Dato a insertar
   */
  data: any
}
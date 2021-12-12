import sql, { IProcedureResult } from 'mssql';

/**
 *  Contiene configuracion de conexion a DB.
 */
class Database {

  private static instance: Database;

  private user: string;
  private pass: string;
  private data: string;
  private serv: string;

  private constructor() {
    this.user = `${process.env.USER}`;
    this.pass = `${process.env.PASS}`;
    this.data = `${process.env.DATA}`;
    this.serv = `${process.env.SERV}`;
  }

  /**
   * Metodo de obtencion de configuracion de base de datos
   * @returns DBConfig
   */
  private getConfig(): DBConfig {
    return {
      user: this.user,
      password: this.pass,
      server: this.serv,
      database: this.data,
      options: {
        trustServerCertificate: true,
      }
    }
  }

  /**
   * Párametro general de obtencion de datos.
   * 
   * @param inputData Arreglo con datos de entrada para Procedures
   * @param procedure Nombre del procedimiento almacenado a utilizar
   * @returns Promise con el resultado o indefinida en caso de error
   */
  public async obtainData(inputData: Array<DataField>, procedure: string): Promise<IProcedureResult<any> | undefined> {
    let pool = null;
    let outputData: IProcedureResult<any> | undefined;

    try {
      pool = await sql.connect(this.getConfig());
      const request = pool.request();
      inputData.forEach(field => request.input(field.name, field.type, field.data));
      const result = await request.execute(procedure)

      outputData = result;

    } catch (err) {
      console.log(err);
    } finally {
      pool?.close();
    }
    return outputData;
  }

  /**
   * Obtiene instancia unica de esta clase
   * @returns Database
   */
  public static getInstance(): Database {
    // Si la instancia a este punto no existe la crea
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

export default Database;
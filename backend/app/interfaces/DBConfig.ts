/**
 *  Interfaz de configuracion de base de datos
 */
interface DBConfig{
  user: string,
  password: string,
  server: string,
  database: string,
  options: {
    trustServerCertificate: true
  }
};

import Database from "../config/Database";

/**
 * Servicio del cual extenderan otros servicios concretos.
 */
 class AbstractService{
 
   // Variable de acceso a la base de datos.
   protected db : Database;
 
   // Variable de retorno al cliente.
   protected result! : ServiceResult;
 
   constructor(){
     this.result = {status: 0}
     this.db = Database.getInstance();
   }
 
 }
 
 export default AbstractService;
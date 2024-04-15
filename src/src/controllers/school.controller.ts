import Registration from "../interfaces/int.school";
import IResponse from "../interfaces/int.response";
import logger from "../../lib/logger";
import Stock from "../models/mod.school";
import HttpServer from "../class/server.class";

export default class ClassControl{// prueba

    private server: HttpServer;
    private connection = null;
  
    constructor() {
      this.server = HttpServer.instance;
    }

    async createKidsStock(student: Registration):Promise <IResponse>{

        try{
            this.connection = this.server.app.locals.dbConnection
            if( student ){
            const stockCreated = await Stock.create( student )
            return({ ok: true, message: "Alta de alumno", response: stockCreated, code: 200})    
            }
            return({ ok: false, message: "Parametros incorrectos", response: null, code: 400})
                    
            
        }catch(err: any){
            logger.error(`createDiskStock ${err}`)
            return ({ ok: false, message: "Ocurrió un error", response: null, code: 500 })
        
        }finally {
            if (this.connection)
            await this.server.app.locals.dbConnection.release(this.connection);
        }   
    }

    async getKidStock(page: number, per_page: number):Promise <IResponse>{
        try {
            this.connection = this.server.app.locals.dbConnection
            const stockDisk = await Stock.find({}).limit(per_page).skip(per_page * (page -1))
            if ( !stockDisk || stockDisk.length < 1 ) {
            return ({ ok: false, message: 'Sin stock', response: stockDisk, code: 404 })
            }
            return({ ok: true, message: 'Stock encontrado', response: stockDisk, code: 200 })

        }catch (err: any) {
            logger.error(`getDiskStock ${err}`);
            return { ok: false, message: "Error ocurred", response: null, code: 500 };
        } finally {
        if (this.connection)
            await this.server.app.locals.dbConnection.release(this.connection);
        }
    }

    async deleteDiskStock(_id: any):Promise <IResponse>{

        try{
            this.connection = this.server.app.locals.dbConnection
            if( _id ){
            const stockDeleted = await Stock.findOneAndDelete( _id )
            return({ ok: true, message: "Stock eliminado", response: stockDeleted, code: 200})    
            }
            return({ ok: false, message: "Parametros incorrectos", response: null, code: 400})
                    
            
        }catch(err: any){
            logger.error(`deleteDiskStock ${err}`)
            return ({ ok: false, message: "Ocurrió un error", response: null, code: 500 })
        
        }finally {
            if (this.connection)
            await this.server.app.locals.dbConnection.release(this.connection);
        }   
    }
}


/**
 * Verificar que el usuario tenga el rol para poder realizar una consulta.
 * @param {permiso} permiso permiso necesario para realizar la conuslta 
 * @param {resultado}   resultado  id del rol del usuario.
 */

import {connection as sql} from './../schemas/db.js';


const validateRole = (permiso,usuarioIdRol,resultado) =>{
    
    //consulta para obtener los roles del usuario.
    sql.query((`SELECT * FROM roles WHERE id = ${usuarioIdRol}`),async (err,res)=>{

        //Error
        if(err){
            resultado(err,null);
            return;
        }
        
        //si el usuario tiene roles.
        if(res.length){

            if((res.permiso) == 1){
                
                resultado(null,true);
                return;
            }
            else{
                resultado(null,false);
                return;
            }
        }

        //el usuario no tiene roles.
        if(res.length == 0){
 
            resultado(null,false);
            return;
            
        }

    });
};


export { validateRole };
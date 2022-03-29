/**
 * Verifica si un usuario existe en la base de datos mediante el mail entrante del front-end.
 * @param {userMail} userMail Mail proveniente del usuario que se intenta crear.
 * @param {resultado}   resultado  callback para pasar los datos al router.
 */

import {connection as sql} from './../utilities/db.js';

const validateExistenceUser = (userMail,resultado) =>{
  

    sql.query(`SELECT * FROM usuarios WHERE mail = "${userMail}"`,async (err,res)=>{

        //Error
        if(err){
            resultado(err,null);
            return;
        }

        //si existe el usuario , enviar un true.
        if(res.length){
            
            if(userMail == res[0].Mail){
                
                resultado(null,true);
                return;
            }
            
        }

        //si el usuario no existe , enviar un false.
        if(res.length == 0){

            resultado(null,false);
            return;
            
        }
    })


}

export {validateExistenceUser};
import {connection as sql} from './../schemas/db.js';

const validateExistenceUser = (userMail,resultado) =>{
  
    sql.query(`SELECT * FROM usuarios WHERE mail = "${userMail}"`,async (err,res)=>{

        if(err){
            resultado(err,null);
            return;
        }

        if(res.length){
            
            if(userMail == res[0].Mail){
                
                resultado(null,true);
                return;
            }
            
        }

        if(res.length == 0){

            resultado(null,false);
            return;
            
        }
    })


}

export {validateExistenceUser};
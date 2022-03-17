/**
 * Verifica si un ente recaudador ya existe en la base de datos mediante el mail entrante del front-end.
 * @param {codRecaudador} codRecaudador Codigo de una entidad recaudadora que se intenta crear.
 * @param {resultado}   resultado  callback para pasar los datos al router.
 */
 import {connection as sql} from './../schemas/db.js';

 const validateExistenceRecaudador = (codRecaudador,resultado) =>{
   
     sql.query(`SELECT * FROM recaudadores WHERE codRecaudadores = ${codRecaudador}`,async (err,res)=>{
 
         //Error
         if(err){
             resultado(err,null);
             return;
         }
         
         //si existe el usuario , enviar un true.
         if(res.length){
             
             if(codRecaudador == res[0].codRecaudadores){
                 
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
 
 export {validateExistenceRecaudador};
import {connection as sql} from './../schemas/db.js';
import  formatoNombreArchivos from './../schemas/formatoNombreArchivos.schema';


//Crear un nuevo nombre de archivo.

formatoNombreArchivos.create = (nuevoFormato,resultado) =>{

    sql.query("INSERT INTO formatoNombreArchivos set ?",nuevoFormato,(err,res)=>{

        //si ocurre un error mandar un null y un msj de err.

        if(err){
            console.log("error",err);
            resultado(err,null)
            return;
        
        }

        //enviar que los datos se ingresaron correctamente.

        console.log("Formato creado:",{id:res.insertID,...nuevoFormato});
        resultado(null,{id:res.insertID,...nuevoFormato});       

    });
};

//Buscar todo los formatos de nombre.

formatoNombreArchivos.getAll = (resultado) =>{

    sql.query('SELECT * from formatoNombreArchivos',(err,res)=>{

        if(err){
            console.log("error",err);
            resultado(null,err);
            return;
        }

        console.log("Formatos de nombre de archivos encontrados.");
        resultado(null,res);

    })

}


//buscar un formato por entidad.

formatoNombreArchivos.getFormatoByEntidad = (entidad,resultado) =>{


    sql.query(`SELECT * FROM formatoNombreArchivos where entidad = ${entidad}`,(err ,res)=>{

         
        if(err){
            console.log('error:',err);
            resultado(err,null);
            return;
        }

        if(res.length){
            console.log('formato de nombre de archivo  encontrado con la entidad',entidad);
            resultado(null,res);
            return;
        }

        resultado({kind:"not_found"},null);
    })

}


//aptualizar un formato.


formatoNombreArchivos.updateById = (id,data,resultado) =>{

    sql.query(
    
        `UPDATE formatoNombreArchivos SET nombre = ? , archivo = ? , estado = ?, tipoArchivo = ? , entidad = ? WHERE id = ${id}`,
        [data.nombre , data.archivo , data.estado , data.tipoArchivo , data.entidad ],
    
    (err , res)=>{


        if(err){    
    
            console.log("error:",err);
            resultado(null,err);
            return;
        }
        
        if(res.affectedRows == 0){
            resultado({kind:'No_Encontrado'},null);
            return;
        }

        console.log("actualizando nombre de archivo con la id:",id);
            resultado(null,{id:id,...data});


    } 
    
    )
}


//borrar un formato de archivo de nombre.

formatoNombreArchivos.remove = (id,resultado) =>{

    sql.query(`DELETE FROM formatoNombreArchivos WHERE id= ${id}`,id,(err,res) =>{

        if(err){
            console.log("error:",err);
            resultado(null,err);
            return; 
        }

        if(res.affectedRows == 0){
            resultado({kind:'No_Encontrado'},null);
            return;
        }

        console.log("formato de nombre de archivo eliminado con la id:" ,id);
        resultado(null,res);
    });

}


export {formatoNombreArchivos};
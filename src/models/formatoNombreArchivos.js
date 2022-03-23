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

//Buscar todo los formatos.

formatoNombreArchivos.getAll = (resultado) =>{

    sql.query('SELECT * from formatoNombreArchivo',(err,res)=>{

         //si ocurre un error mandar un null y un msj de err.
        if(err){

            console.log('error',err);
            resultado(null,err);
            return;

        }

        //enviar los datos.
        console.log("archivos",res);
        resultado(null,res);

    })

}

//Buscar por numero de archivo.

formatoNombreArchivos.getByArchivo = (archivo,resultado) =>{

    sql.query(`SELECT * from formatoNombreArchivo where archivo = ${archivo}`,(err,res)=>{

         //si ocurre un error mandar un null y un msj de err.
        if(err){

            console.log('error',err);
            resultado(null,err);
            return;

        }

        //enviar los datos.
        console.log("archivos",res);
        resultado(null,res);

    })

}

//aptualizar un nombre de archivo.


formatoNombreArchivos.updateById = (id,formatoNombreArchivo,resultado)=>{
  
    sql.query(

        `UPDATE formatoNombreArchivo set nombre = ? , archivo = ? , estado = ?,tipoArchivo = ?,entidad = ? where id = &{id}`,
        [formatoNombreArchivo.nombre,formatoNombreArchivo.archivo, formatoNombreArchivo.estado,formatoNombreArchivo.entidad],
        (err,res)=>{
       
            if(err){    
    
                console.log("error:",err);
                result(null,err);
                return;
            }
            
            if(res.affectedRows == 0){
                result({kind:'No_Encontrado'},null);
                return;
            }

            console.log("actualizando formatonombreArchivos:",{id:id,...formatoNombreArchivo});
            result(null,{id:id,...formatoNombreArchivo});

        }

    )
    
}

//borrar un formato de archivo.

formatoNombreArchivos.remove = (id,result) =>{

    sql.query(`DELETE FROM nombreArchivosFormato  WHERE id = ${id}`,id,(err,res) =>{

        if(err){
            console.log("error:",err);
            result(null,err);
            return; 
        }

        if(res.affectedRows == 0){
            result({kind:'No_Encontrado'},null);
            return;
        }

        console.log("formato de archivo eliminado con la id:" ,id);
        result(null,res);
    });

}

export  {formatoNombreArchivos};
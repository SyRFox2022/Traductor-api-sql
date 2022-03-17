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

        


    })


}



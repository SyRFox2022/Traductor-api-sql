import {connection as sql} from './../utilities/db.js';
import archivos from './../schemas/archivos.schema'

//ingresar un nuevo archivo a la base.

archivos.create = (nuevoArchivo,resultado) =>{

    sql-query('INSERT INTO archivos SET ?',nuevoArchivo,(err,res)=>{


        if(err){
            console.log("error",err);
            resultado(err,null);
            return;
        }

        console.log('archivo creado:',{id:res.insertID,...nuevoArchivo});
        resultado(null,{id:res.insertID,...nuevoArchivo});
    })

}

//obtener todos los recaudadores.

archivos.getAll = (resultado) =>{

    sql.query('SELECT * FROM archivos',(err,res)=>{

        if(err){
            console.log('error',err);
            resultado(null,err);
            return;
        }

        console.log("archivos encontrados.");
        resultado(null,res);
    })
}


//obtenter todos los archivos de una entidad.

archivos.getAllCodRecaudador = (codRecaudadores,resultado)=>{

    sql.query("select * from archivos WHERE codRecaudadores = ?",codRecaudadores,(err,res)=>{


        if(err){
            console.log("error",err);
            resultado(null,err);
            return;
        }


        if(res.affectedRows == 0){
        
            resultado({kind:'no_encontrado'},null);
            return;
        }


        console.log("archivos de ",codRecaudadores ," Encontrados.");
        resultado(null,res);
    
    })
}

//obtenter un archivo por id .

archivos.getById = (id,resultado)=>{

    sql.query("select * from archivos WHERE id = ?",id,(err,res)=>{


        if(err){
            console.log("error",err);
            resultado(null,err);
            return;
        }


        if(res.affectedRows == 0){
        
            resultado({kind:'no_encontrado'},null);
            return;
        }


        console.log("archivos de ",id ," Encontrados.");
        resultado(null,res);
    
    })
}

//aptualizar un recaudador.

archivos.updateById = (id,archivos,result) =>  {

    sql.query(

        "UPDATE archivos SET nombre = ?,entidad = ?,idFormato = ?,fecha = ?, tipoPrograma = ?,codRecaudadores = ?  WHERE id = ?",
        [archivos.nombre,archivos.entidad,archivos.idFormato,archivos.fecha,archivos.tipoArchivo,archivos.codRecaudadores],
        (err,res) =>{
            
            if(err){    
    
                console.log("error:",err);
                result(null,err);
                return;
            }
            
            if(res.affectedRows == 0){
                result({kind:'No_Encontrado'},null);
                return;
            }

            console.log("aptualizado archivos:",{id:id,...usuario});
            result(null,{id:id,...usuario});
        
        }

    )
};


//Borrar un archivo

archivos.remove = (id,result) =>{

    sql.query("DELETE * FROM archivos  WHERE id = ?",id,(err,res) =>{

        if(err){
            console.log("error:",err);
            result(null,err);
            return; 
        }

        if(res.affectedRows == 0){
            result({kind:'No_Encontrado'},null);
            return;
        }

        console.log("Usuario eliminado con la id:" ,id);
        result(null,res);
    });

}



//borrar todos los archivos de un cod.

archivos.removeAllByCodRecaudadores = (codRecaudadores,result) =>{

    sql.query("DELETE FROM archivos  WHERE codRecaudadores = ?",codRecaudadores,(err,res) =>{

        if(err){
            console.log("error:",err);
            result(null,err);
            return; 
        }

        if(res.affectedRows == 0){
            result({kind:'No_Encontrado'},null);
            return;
        }

        console.log("Usuario eliminado con la codRecaudadores:" ,codRecaudadores);
        result(null,res);
    });

}

export {archivos};





























import {connection as sql} from './../schemas/db.js';
import recaudadores from './../schemas/recaudadores.schema'

recaudadores.create = (nuevoRecaudador,resultado) =>{

    sql.query("INSERT INTO recaudadores SET ?",nuevoRecaudador,(err,res)=>{
        
        if(err){
            console.log("error:",err);
            resultado(err,null);
            return;
        }
        console.log('Recaudador creado');
        resultado(null,{id:res.insertID,...nuevoRecaudador});
    });
};

//buscar un recaudador usando el codRecaudador.

recaudadores.findByCodRecaudador = (codRecaudador,resultado) =>{

    sql.query(`SELECT * FROM recaudadores WHERE codRecaudadores = ${codRecaudador}`,(err,res)=>{
        
        if(err){
            console.log('error:',err);
            resultado(err,null);
            return;
        }

        if(res.length){
            console.log('recaudador  encontrado con el cod',codRecaudador);
            resultado(null,res);
            return;
        }

        resultado({kind:"not_found"},null);
    })
}

//obtener todos los recaudadores.

recaudadores.getAll = (result) =>{

    let query = 'SELECT * FROM recaudadores';

    sql.query(query,(err,res)=>{
        if(err){
            console.log("error",err);
            result(null,err);
            return;
        }

        console.log("recaudadores encontrados.");
        result(null,res);

    })
}
 
//aptualizar un recaudador.

recaudadores.updateByCodRecaudador = (codRecaudadores,recaudadores,result) =>  {

    sql.query(

        `UPDATE recaudadores SET codRecaudadores = ?,nombre = ?,tipoArchivo = ?,estado = ?, idPrograma = ? WHERE codRecaudadores = ${codRecaudadores}`,
        [recaudadores.codRecaudadores,recaudadores.nombre,recaudadores.tipoArchivo,recaudadores.estado,recaudadores.idPrograma],
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

            console.log("actualizando recaudador con codrecaudadores:",codRecaudadores);
            result(null,{codRecaudadores:codRecaudadores,...recaudadores});
        
        }

    )
};


//Borrar un recaudador

recaudadores.remove = (codRecaudador,result) =>{

    sql.query(`DELETE FROM recaudadores  WHERE codRecaudadores = ${codRecaudador}`,codRecaudador,(err,res) =>{

        if(err){
            console.log("error:",err);
            result(null,err);
            return; 
        }

        if(res.affectedRows == 0){
            result({kind:'No_Encontrado'},null);
            return;
        }

        console.log("recaudador eliminado con la codRecaudadores:" ,codRecaudador);
        result(null,res);
    });

}

export  {recaudadores};
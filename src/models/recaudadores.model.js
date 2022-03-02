const sql = require('./../schemas/db.js');

recaudadores = require('./../schemas/recaudadores.schema');

recaudadores.create = (nuevoRecaudador,resultado) =>{

    sql.query("INSERT INTO recaudadores SET ?",nuevoRecaudador,(err,res)=>{
        
        if(err){
            console.log("error:",err);
            resultado(err,null);
            return;
        }
        console.log('Recaudador creado:',{id:res.insertID,...nuevoRecaudador});
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
            console.log('recaudador  encontrado:',res);
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

        console.log("recaudadores:" ,res);
        result(null,res);

    })
}
 
//aptualizar un recaudador.

recaudadores.updateById = (codRecaudador,recaudadores,result) =>  {

    sql.query(

        "UPDATE recaudadores SET codRecaudador = ?,nombre = ?,tipoArchivo = ?,estado = ?, idPrograma = ?,foto = ?  WHERE codRecaudador = ?",
        [recaudadores.status,recaudadores.role,recaudadores.mail,recaudadores.firstName,recaudadores.lastName,recaudadores.company,recaudadores.password],
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

            console.log("aptualizado recaudadores:",{codRecaudador:codRecaudador,...usuario});
            result(null,{codRecaudador:codRecaudador,...usuario});
        
        }

    )
};


//Borrar un recaudador

recaudadores.remove = (codRecaudador,result) =>{

    sql.query("DELETE FROM recaudadores  WHERE codRecaudador = ?",codRecaudador,(err,res) =>{

        if(err){
            console.log("error:",err);
            result(null,err);
            return; 
        }

        if(res.affectedRows == 0){
            result({kind:'No_Encontrado'},null);
            return;
        }

        console.log("Usuario eliminado con la codRecaudador:" ,codRecaudador);
        result(null,res);
    });

}

module.exports = recaudadores;
import {connection as sql} from './../schemas/db.js';
import usuarios from './../schemas/usuarios.schemas.js'


//crear usuario.
usuarios.create = (nuevoUsuario,resultado) =>{

    sql.query("INSERT INTO usuarios SET ?",nuevoUsuario,(err,res)=>{
        
        if(err){
            console.log("error:",err);
            resultado(err,null);
            return;
        }
        console.log('Usuario creado:',{id:res.insertID,...nuevoUsuario});
        resultado(null,{id:res.insertID,...nuevoUsuario});
    });
};

//buscar un usuario usando como campo el mail.

usuarios.findByMail = (mail,resultado) =>{

    sql.query(`SELECT * FROM usuarios WHERE mail = "${mail}"`,(err,res)=>{
        
        if(err){
            console.log('error:',err);
            resultado(err,null);
            return;
        }

        if(res.length){
            console.log('Usuario encontrado:',res);
            resultado(null,res);
            return;
        }

        resultado({kind:"not_found"},null);
    })
}

//obtener todos los usuarios.

usuarios.getAll = (result) =>{

    let query = 'SELECT * FROM usuarios';

    sql.query(query,(err,res)=>{
        if(err){
            console.log("error",err);
            result(null,err);
            return;
        }

        console.log("usuarios:" ,res);
        result(null,res);

    })
}
 
//aptualizar un usuario.

usuarios.updateById = (id,usuario,result) =>  {

    sql.query(

        "UPDATE usuarios SET Status = ?,Role = ?,mail = ?,FirstName = ?, LastName = ?,Company = ?,Password = ? WHERE Id = ?",
        [usuarios.status,usuarios.role,usuarios.mail,usuarios.firstName,usuarios.lastName,usuarios.company,usuarios.password],
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

            console.log("aptualizado usuario:",{id:id,...usuario});
            result(null,{id:id,...usuario});
        
        }

    )
};


//Borrar un usuario.

usuarios.remove = (id,result) =>{

    sql.query("DELETE * FROM usuarios  WHERE id = ?",id,(err,res) =>{

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


export{ usuarios };
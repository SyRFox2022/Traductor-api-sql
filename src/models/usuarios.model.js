import {connection as sql} from './../utilities/db.js';
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
            console.log('Usuario encontrado:',mail);
            resultado(null,res);
            return;
        }

        resultado({kind:"not_found"},null);
    })
}

//buscar un usuario usando como la id.

usuarios.findByid = (id,resultado) =>{

    sql.query(`SELECT * FROM usuarios WHERE id = "${id}"`,(err,res)=>{
        
        if(err){
            console.log('error:',err);
            resultado(err,null);
            return;
        }

        if(res.length){
            console.log('Usuario encontrado:',id);
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

        console.log("usuarios encontrados.");
        result(null,res);

    })
}
 
//aptualizar un usuario.

usuarios.updateById = (id,usuarios,result) =>  {

    sql.query(
 
        `UPDATE usuarios SET Status = ?,Role = ?,IdRol = ?,mail = ?,FirstName = ?, LastName = ?,Company = ?,Password = ? WHERE Id = ${id}`,
        [usuarios.Status,usuarios.Role,usuarios.IdRol,usuarios.Mail,usuarios.FirstName,usuarios.LastName,usuarios.Company,usuarios.Password],
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

            console.log("aptualizado usuario con la id",id);
            result(null,{id:id,...usuarios});
        
        }

    )
};


//Borrar un usuario.

usuarios.remove = (id,result) =>{

    sql.query(`DELETE FROM usuarios  WHERE id = ${parseInt(id)}`,(err,res) =>{

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
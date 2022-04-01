import {connection as sql} from './../utilities/db.js';
import roles from "./../schemas/roles.schema";

//crear un nuevo rol

roles.create = (nuevoRol,resultado) =>{

    //realizar la consulta a la base de datos.
    sql.query("INSERT INTO roles set ?",nuevoRol,(err,res)=>{

        //si falla la consulta.
        if(err){
            console.log("error:",err);
            resultado(err,null);
            return;
        }
        console.log("Rol creado");
        resultado(null,{id:res.insertID,...nuevoRol});
    })
}

//buscar todo los roles.

roles.getAll = (result) =>{

    let query = 'SELECT * FROM roles';

    sql.query(query,(err,res)=>{
        if(err){
            console.log("error",err);
            result(null,err);
            return;
        }

        console.log("roles encontrados.");
        result(null,res);

    })
}
 
//buscar un rol por id.

roles.findById = (id,resultado) =>{

    //realizar la consulta a la base de datos.
    sql.query(`SELECT * FROM roles WHERE id = ${id}`,(err,res)=>{

        //si falla la consulta.
        if(err){
            console.log('error:',err);
            resultado(err,null);
            return;
        }

        //si se encuentra algo con la id.
        if(res.length){
            resultado(null,res);
            return;
        }
        
        //si no se encuentra nada con esa id.
        resultado({kind:"not_found"},null);

    })
}

//aptualizar un rol por id.

roles.updateById = (id,datos,resultado) =>{
    
    //realizar la consulta.
    sql.query(
        `UPDATE roles SET nombre = ?,EditEntidades = ? ,EditArchivos = ? ,DeleteEntidades = ? ,DeleteEntidades = ?,CreateEntidades = ?,CreateArchivos = ?,A_CreateUsuarios = ?,A_EditUsuarios = ?,A_DeleteUsuarios = ?,A_CreateRoles = ?,A_EditRoles = ?,A_DeleteRoles = ?,A_MakeAdmin = ?,A_DoubleVar = ? where id = ${id}`,
        [datos.Nombre,datos.EditEntidades,datos.EditArchivos,datos.DeleteEntidades,datos.DeleteArchivos,datos.CreateEntidades,datos.CreateARchivos,datos.A_CreateUsuarios,datos.A_EditUsuarios,datos.A_DeleteUsuarios,datos.CreateRoles,datos.A_EditRoles,datos.A_DeleteRoles,datos.A_MakeAdmin ,datos.A_DoubleVar],
        (err,res) =>{

            if(err){
                console.log("error:",err);
                resultado(null,err);
                return;
            }

            if(res.affectedRows == 0){
            resultado({kind:'No_Encontrado'},null);
            return;
        }


        console.log("aptualizado el rol con la id:",id);
        resultado(null,{id:id,...datos})

        }
    )
}

//borrar un rol

roles.remove  = (id,resultado) =>{

    //realizar la consulta.
    sql.query (`DELETE FROM roles where id = ${id}`,(err,res)=>{

        if(err){
            console.log("error:",err);
            resultado(null,err);
            return; 
        }

        if(res.affectedRows == 0){
            resultado({kind:'No_Encontrado'},null);
            return;
        }

        console.log("rol eliminado con id:" ,id);
        result(null,res);
    })
}


export {roles};
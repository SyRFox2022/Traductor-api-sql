const sql = require('./db.js');

const usuarios = function(usuario){

    this.id = usuario.id,
    this.status = usuario.status,
    this.role = usuario.role,
    this.mail = usuario.mail,
    this.firtName = usuario.firtName,
    this.lastName = usuario.lastName,
    this.company = usuario.company,
    this.password = usuario.password

};

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

usuarios.findByMail = (mail,resultado) =>{

    sql.query(`SELECT * FROM usuarios WHERE mail = ${mail}`,(err,res)=>{
        
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

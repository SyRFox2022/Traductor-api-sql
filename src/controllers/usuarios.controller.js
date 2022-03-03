const usuarios = require('./../models/usuarios.model');

//Crear un nuevo usuario.

exports.create = (req,res) =>{

    if(!req.body){
        res.status(400).send(
        {
            message:'El contenido no puede estar vacio,por favor rellene los campos.',
        }
        )
    }

    //creando un objeto para guardar los datos recibidos del front end.
    const usuario ={

        Status: req.body.status,
        Role: req.body.role,
        Mail: req.body.mail,
        FirstName:req.body.firstName,
        LastName: req.body.lastName,
        Company: req.body.company,
        Password: req.body.password,
    }

    //Guardar el usuario en la base de datos.

    usuarios.create(usuario,(err,data)=>{

        if(err){
        res.status(500).send({
            message: err.message || "A ocurrido un error al intentar crear el usuario."
        })
        }
        else{
            res.send(data);
        }
    })

}

//buscar un usuario por Mail.

exports.findByMail = (req,res) => {

    usuarios.findByMail(req.params.mail,(err,data)=>{

      if(err){

        //Si no se encuentra ningun usuario con ese mail.
        if(err.kind === 'No_Encontrado'){ 
            res.status(404).send({
                message:`No podimos encontrar un usuario con el mail: ${req.params.mail} `
            })
        }
        else{
            res.status(500).send({
                message: `Error al intentar buscar por el mail: ${req.param.mail}`
            })
        }
      }  
      else{
        console.log("usuarios obtenido");
        res.send(data);
      }

    })
}

//obtener todos los usuarios.


exports.getAll = (req,res) =>{
    
    usuarios.getAll((err,data)=>{

        if(err){
            res.status(500).send({
                message:
                    err.message || "Error al intentar obtener todo los usuarios."
            })
        }
        else{
            console.log('obtenidos todos los usuarios.');
            res.json(data);
        }
    })
}


//aptualizar un usuarios por id.

exports.updateById = (req,res) =>{

    if(!req.body){
        res.status(400).send({
            message: "EL contenido esta vacio y no se puede realizar la aptualizacion."
        });
    }

    console.log(req.body);

    usuarios.updateById(
        req.params.id,
        new usuarios(req.body),
        (err,data) =>{
            if(err){
                if(err.kind === 'No_Encontrado'){
                    res.status(404).send({
                        message: "No encontrado el usuario."
                    })
                }
                else{
                    res.status(500).send({
                        message: "Error al aptualizar"
                    })
                }

            }
            else{
                res.send(data);
            }    
        }
    )

}


//BOrrar un usuario por id.

exports.remove = (req, res) => {
    usuarios.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "No_encontrado") {
          res.status(404).send({
            message: `No encontarmos usuario con el id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "No pudimos eliminar el usuario con id " + req.params.id
          });
        }
      } else res.send({ message: `Usuario eliminado con exito.` });
    });
  };

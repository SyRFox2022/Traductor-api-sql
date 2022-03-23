import {usuarios} from "./../models/usuarios.model";
//Crear un nuevo usuario.


export const create = (req,res) =>{

    if(!req.body){
        res.status(400).send(
        {
            message:'El contenido no puede estar vacio,por favor rellene los campos.',
        }
        )
    }

    //creando un objeto para guardar los datos recibidos del front end.
    const usuario ={

        Status: req.body.Status,
        Role: req.body.Role,
        Mail: req.body.Mail,
        FirstName:req.body.FirstName,
        LastName: req.body.LastName,
        Company: req.body.Company,
        Password: req.body.Password,
  
    }

    console.log(usuario);

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

export const findByMail = (req,res) => {

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

//buscar por id.

export const findById = (req,res) => {

    usuarios.findByid(req.params.id,(err,data)=>{

      if(err){

        //Si no se encuentra ningun usuario con ese id.
        if(err.kind === 'No_Encontrado'){ 
            res.status(404).send({
                message:`No podimos encontrar un usuario con el id: ${req.params.id} `
            })
        }
        else{
            res.status(500).send({
                message: `Error al intentar buscar por el id: ${req.param.id}`
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


export const getAll = (req,res) =>{
    
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

export const updateById = (req,res) =>{

    if(!req.body){
        res.status(400).send({
            message: "EL contenido esta vacio y no se puede realizar la aptualizacion."
        });
    }

    console.log(req.body);

    usuarios.updateById(
        req.params.id,
        req.body,
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

export const remove = (req, res) => {
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


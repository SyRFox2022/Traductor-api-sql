import {roles} from "./../models/roles.model";

//crear un nuevo rol.
export const create = (req,res)=>{

    //si el contenido llega vacio.
    if(!req.body){
        res.status(400).send({
            message:"El contenido no puede estar vacio , por favor rellene los campos."
        })
    }

    const newRol = {
        nombre: req.body.nombre,
        editEntidades: req.body.editEntidades,
        editArchivos: req.body.editArchivos,
        deleteEntidades: req.body.deleteEntidades,
        deleteArchivos: req.body.deleteArchivos,
        createEntidades: req.body.createEntidades,
        crateArchivos: req.body.crateArchivos,
        A_createUsuarios: req.body.A_createUsuarios,
        A_editUsuarios: req.body.A_editUsuarios,
        A_deleteUsuarios: req.body.A_deleteUsuarios,
        A_createRoles: req.body.A_createRoles,
        A_editRoles: req.body.A_editRoles,
        A_deleteRoles: req.body.A_deleteRoles,
        A_makeAdmin: req.body.A_makeAdmin,
        A_doubleV: req.body.A_doubleV
    }

    console.log(newRol);

    roles.create(newRol,(err,data)=>{

        if(err){
            res.status(500).send({
                message:err.message || "a ocurrido un error al intentar crear el rol"
            })
        }

        else{
            res.send(data);
        }
    })
}

//buscar un rol por id.

export const findById = (req, res) =>{

    roles.findById(req.params.Id,(err,data)=>{
    
    //verificar si ocurrio algun error.
    if(err){

        if(err.kind === "No_Encontrado"){
            res.status(404).send({
                message:`No podimos el rol con la id: ${req.params.Id} `
            }) 
        }
        else{
            res.status(500).send({
                message: `Error al intentar buscar el rol con la id: ${req.param.Id}`
            })

        }
    }
    else{
        console.log("rol encontrado con la id:",req.params.Id);
        res.send(data);
    }

    })

}

//aptualizar un rol.

export const updateById = (req,res)=>{
    
    //si el contenido llega vacio.
    if(!req.body){
        res.status(400).send({
            message:"El contenido no puede estar vacio , por favor rellene los campos."
        })
    }

    console.log(req.body);

    roles.updateById(
        req.params.id,
        req.body,
        (err,data) =>{
            if(err){
                if(err.kind === 'No_Encontrado'){
                    res.status(404).send({
                        message: "rol no encontrado."
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

//borrar un rol.

export const remove = (req, res) => {
    roles.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "No_encontrado") {
          res.status(404).send({
            message: `No encontarmos el rol con el id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "No pudimos eliminar el rol con id " + req.params.id
          });
        }
      } else res.send({ message: `rol eliminado con exito.` });
    });
  };


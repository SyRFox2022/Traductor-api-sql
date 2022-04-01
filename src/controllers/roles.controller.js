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
        Nombre: req.body.nombre,
        EDitEntidades: req.body.editEntidades,
        EditArchivos: req.body.editArchivos,
        DeleteEntidades: req.body.deleteEntidades,
        DeleteArchivos: req.body.deleteArchivos,
        CreateEntidades: req.body.createEntidades,
        CreateArchivos: req.body.createArchivos,
        A_CreateUsuarios: req.body.A_createUsuarios,// puede pasar porque son como 300 campos
        A_EditUsuarios: req.body.A_editUsuarios,
        A_DeleteUsuarios: req.body.A_deleteUsuarios,
        A_CreateRoles: req.body.A_createRoles,
        A_EditRoles: req.body.A_editRoles,
        A_DeleteRoles: req.body.A_deleteRoles,
        A_MakeAdmin: req.body.A_makeAdmin,
        A_DoubleVer: req.body.A_doubleV
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
//obtener todos los roles.

export  const getAll = (req,res) =>{
    
    roles.getAll((err,data)=>{

        if(err){
            res.status(500).send({
                message:
                    err.message || "Error al intentar obtener todo los roles."
            })
        }
        else{
            console.log('obtenidos todos los roles.');
            res.json(data);
        }
    })
}

//buscar un rol por id.

export const findById = (req, res) =>{

    roles.findById(req.params.id,(err,data)=>{
    
    //verificar si ocurrio algun error.
    if(err){

        if(err.kind === "No_Encontrado"){
            res.status(404).send({
                message:`No podimos el rol con la id: ${req.params.id} `
            }) 
        }
        else{
            res.status(500).send({
                message: `Error al intentar buscar el rol con la id: ${req.params.id}`
            })

        }
    }
    else{
        console.log("rol encontrado con la id:",req.params.id);
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
    roles.remove(req.params.id, (err, data) =>{
      if (err) {
        if (err.kind === "No_Encontrado") {
          res.status(404).send({
            message: `No encontarmos el rol con el id ${req.params.id}.`
          });
        } 
        else {
          res.status(500).send({
            message: "No pudimos eliminar el rol con id " + req.params.id
          });
        }
      } 
      else res.send({ message: `rol eliminado con exito.` });
    });
  };


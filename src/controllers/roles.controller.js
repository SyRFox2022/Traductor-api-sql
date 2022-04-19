import {roles} from "./../models/roles.model";

//crear un nuevo rol.
export const create = (req,res)=>{
    console.log(req.body)
    //si el contenido llega vacio.
    if(!req.body){
        res.status(400).send({
            message:"El contenido no puede estar vacio , por favor rellene los campos."
        })
    }

    const newRol = {
        Nombre: req.body.Nombre,
        EDitEntidades: req.body.EDitEntidades,
        EditArchivos: req.body.EditArchivos,
        DeleteEntidades: req.body.DeleteEntidades,
        DeleteArchivos: req.body.DeleteArchivos,
        CreateEntidades: req.body.CreateEntidades,
        CreateArchivos: req.body.CreateArchivos,
        A_CreateUsuarios: req.body.A_CreateUsuarios,// puede pasar porque son como 300 campos
        A_EditUsuarios: req.body.A_EditUsuarios,
        A_DeleteUsuarios: req.body.A_DeleteUsuarios,
        A_CreateRoles: req.body.A_CreateRoles,
        A_EditRoles: req.body.A_EditRoles,
        A_DeleteRoles: req.body.A_DeleteRoles,
        A_MakeAdmin: req.body.A_MakeAdmin,
        A_DoubleVer: req.body.A_DoubleVer,
        SoloVisualizar: req.body.SoloVisualizar
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

//actualizar un rol.

export const updateById = (req,res)=>{
    
    //si el contenido llega vacio.
    if(!req.body){
        res.status(400).send({
            message:"El contenido no puede estar vacio , por favor rellene los campos."
        })
    }

    console.log("soy el body",req.body);
    console.log("req.params.id",req.params);
    console.log(req.params.id);

    roles.updateById(
        req.params.Id,
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
                        message: "Error al actualizar"
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
    roles.remove(req.params.Id, (err, data) =>{
      if (err) {
        if (err.kind === "No_Encontrado") {
          res.status(404).send({
            message: `No encontarmos el rol con el id ${req.params.Id}.`
          });
        } 
        else {
          res.status(500).send({
            message: "No pudimos eliminar el rol con id " + req.params.Id
          });
        }
      } 
      else res.send({ message: `rol eliminado con exito.` });
    });
  };


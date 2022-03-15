import {archivos} from "./../models/archivos.model.js";

//crear un nuevo archivo.

export const create = (req,res) =>{

    if(!req.body){
        res.status(400).send({
            message:'El contenido no puede estar vacio , por favor rellene los campos.',
        })
    }
    return;


    const archivo = {

        nombre: req.body.nombre,
        entidad: req.body.entidad,
        idFormato: req.body.idFormato,
        fecha: req.body.fecha,
        tipoArchivo: req.body.tipoArchivo,
        codRecaudadores: req.body.codRecaudadores

    }

//guardar el nuevo archivo en la base de datos.

    archivos.create(archivo,(err,res)=>{

        if(err){
            res.status(500).send({
                message: err.message || "a ocurrido un error al intentar crear el archivo."
            })
        return;
       
        }

        else{

            res.send(data);
            return;
        
        }
    })

}


//obtener todos los archivos

export const getALl = (req,res) =>{

    archivos.getAll((err,data)=>{

        if(err){
            res.status(500).send({
                message:
                    err.message || "error al intentar obtener todos los archivos."
            })
        }
        else{
            console.log("archivos obtenidos.")
            res.json(data);
        }
    })
}


//obtenter todos los archivos de una entidad.


export const findByCodRecaudador = (req,res) => {

    archivos.findByCodRecaudador(req.params.codRecaudador,(err,data)=>{

      if(err){

        //Si no se encuentra ningun archivo con ese codRecaudador.
        if(err.kind === 'No_Encontrado'){ 
            res.status(404).send({
                message:`No podimos encontrar un archivo con el codRecaudador: ${req.params.codRecaudador} `
            })
        }
        else{
            res.status(500).send({
                message: `Error al intentar buscar por el codRecaudador: ${req.params.codRecaudador}`
            })
        }
      }  
      else{
        console.log("archivos obtenidos");
        res.send(data);
      }

    })
}

//buscar un archivo por id.

export const findByid = (req,res) => {

    archivos.findByid(req.params.id,(err,data)=>{

      if(err){

        //Si no se encuentra ningun usuario con ese codRecaudador.
        if(err.kind === 'No_Encontrado'){ 
            res.status(404).send({
                message:`No podimos encontrar un usuario con el codRecaudador: ${req.params.codRecaudador} `
            })
        }
        else{
            res.status(500).send({
                message: `Error al intentar buscar por el codRecaudador: ${req.params.codRecaudador}`
            })
        }
      }  
      else{
        console.log("recaudadores obtenido");
        res.send(data);
      }

    })
}
//aptualizar un recaudador.

export const updateByid = (req,res) =>{

    if(!req.body){
        res.status(400).send({
            message: "EL contenido esta vacio y no se puede realizar la aptualizacion."
        });
    }

    console.log(req.body);

    archivos.updateByid(
        req.params.id,
        new archivos(req.body),
        (err,data) =>{
            if(err){
                if(err.kind === 'No_Encontrado'){
                    res.status(404).send({
                        message: "No encontrado el recaudador."
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
//Borrar un archivo

export const remove = (req, res) => {
    archivos.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "No_encontrado") {
          res.status(404).send({
            message: `No encontarmos recaudador con el id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "No pudimos eliminar el recaudador con id " + req.params.id
          });
        }
      } else res.send({ message: `recaudador eliminado con exito.` });
    });
  };

//borrar todos los archivos con cod recuadadores.


export const removeAllByCodRecaudadores = (req, res) => {
    archivos.removeAllByCodRecaudadores(req.params.codRecaudadores, (err, data) => {
      if (err) {
        if (err.kind === "No_encontrado") {
          res.status(404).send({
            message: `No encontarmos recaudador con el codRecaudadores ${req.params.codRecaudadores}.`
          });
        } else {
          res.status(500).send({
            message: "No pudimos eliminar el recaudador con codRecaudadores " + req.params.codRecaudadores
          });
        }
      } else res.send({ message: `recaudador eliminado con exito.` });
    });
  };

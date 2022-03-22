import {formatoNombreArchivos as model} from './models/formatoNombreArchivo';

//crear un nuevo formato de nombre de archivo.

export const create = (req,res) =>{

    //verificar que el contenido no este vacio.

    if(!req.body){
        res.status(400).send(
        {
            message:'El contenido no puede estar vacio,por favor rellene los campos.',
        }
        )
        return;
    }

    const newFormato = {

        nombre: req.body.nombre,
        archivo: req.body.archivo,
        estado: req.body.estado,
        tipoArchivo : req.body.tipoArchivo,
        entidad: req.body.entidad,

    }

    //enviar la consulta.
    model.create(newFormato,(err,data)=>{

        if(err){
            res.status(500).send({
                message: err.message || "A ocurrido un error al intentar crear el formato."
            })
            return;    
            
        }
            else{
                res.send(data);
                return;
            }

    })

}

//buscar todos los formatos.

export  const getAll = (req,res) =>{
    
    model.getAll((err,data)=>{

        if(err){
            res.status(500).send({
                message:
                    err.message || "Error al intentar obtener todo los formato de nombre de archivo."
            })
        }
        else{
            console.log('obtenidos todos los formato de nombre de archivo.');
            res.json(data);
        }
    })
}

//buscar todos los formatos de una entidad.

export const findByEntidad= (req,res) => {

    model.getFormatoByEntidad(req.params.entidad,(err,data)=>{

      if(err){

        //Si no se encuentra ningun usuario con ese entidad.
        if(err.kind === 'No_Encontrado'){ 
            res.status(404).send({
                message:`No podimos encontrar un formato de nombre de archivo con el entidad: ${req.params.entidad} `
            })
        }
        else{
            res.status(500).send({
                message: `Error al intentar buscar por el entidad: ${req.params.entidad}`
            })
        }
      }  
      else{
        console.log("formatos  obtenidos");
        res.send(data);
      }

    })
}

//aptualizar un formato de archivo.

export  const updateById = (req,res) =>{

    if(!req.body){
        res.status(400).send({
            message: "EL contenido esta vacio y no se puede realizar la aptualizacion."
        });
    }

    console.log(req.body);

    model.updateById(
        req.params.id,
        req.body,
        (err,data) =>{
            if(err){
                if(err.kind === 'No_Encontrado'){
                    res.status(404).send({
                        message: "No encontrado el formato de nombre de archivo."
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


//borrar un formato de archivo.


export const remove = (req, res) => {
    model.remove(req.params.id, (err, data) => {

        if (err) {
        if (err.kind === "No_encontrado") {
          res.status(404).send({
            message: `No encontarmos formato de nombre de archivo con el id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "No pudimos eliminar el formato de nombre de archivo con id " + req.params.id
          });
        }
      } else res.send({ message: `formato de nombre de archivo eliminado con exito.` });
    });
  };

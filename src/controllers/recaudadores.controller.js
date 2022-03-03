const recaudadores = require('./../models/recaudadores.model');

//Crear un nuevo recaudador.

exports.create = (req,res) =>{

    if(!req.body){
        res.status(400).send(
        {
            message:'El contenido no puede estar vacio,por favor rellene los campos.',
        }
        )
        return;
    }

    //creando un objeto para guardar los datos recibidos del front end.
    
    const recaudador = {

        codRecaudadores: req.body.codRecaudadores,
        nombre: req.body.nombre,
        tipoArchivo: req.body.tipoArchivo,
        estado:req.body.estado,
        idPrograma: req.body.idPrograma,
        foto: req.body.foto,

    }

    //Guardar el recaudador en la base de datos.

    recaudadores.create(recaudador,(err,data)=>{

        if(err){
        res.status(500).send({
            message: err.message || "A ocurrido un error al intentar crear el recaudador."
        })
        return;    
        
    }
        else{
            res.send(data);
            return;
        }
    })

}

//buscar un recaudador por codRecaudador.

exports.findByCodRecaudador = (req,res) => {

    recaudadores.findByCodRecaudador(req.params.codRecaudador,(err,data)=>{

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

//obtener todos los recaudadores.


exports.getAll = (req,res) =>{
    
    recaudadores.getAll((err,data)=>{

        if(err){
            res.status(500).send({
                message:
                    err.message || "Error al intentar obtener todo los recaudadores."
            })
        }
        else{
            console.log('obtenidos todos los recaudadores.');
            res.json(data);
        }
    })
}


//aptualizar un recaudadores por id.

exports.updateByCodRecaudador = (req,res) =>{

    if(!req.body){
        res.status(400).send({
            message: "EL contenido esta vacio y no se puede realizar la aptualizacion."
        });
    }

    console.log(req.body);

    recaudadores.updateByCodRecaudador(
        req.params.id,
        new recaudadores(req.body),
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


//BOrrar un recaudador por codRecaudador.

exports.remove = (req, res) => {
    recaudadores.remove(req.params.codRecaudador, (err, data) => {
      if (err) {
        if (err.kind === "No_encontrado") {
          res.status(404).send({
            message: `No encontarmos recaudador con el codRecaudador ${req.params.codRecaudador}.`
          });
        } else {
          res.status(500).send({
            message: "No pudimos eliminar el recaudador con codRecaudador " + req.params.codRecaudador
          });
        }
      } else res.send({ message: `recaudador eliminado con exito.` });
    });
  };

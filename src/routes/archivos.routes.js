import express from 'express';

import { create , getALl , findByCodRecaudador , findByid , updateByid ,remove,removeAllByCodRecaudadores} from  './../controllers/archivos.controller';

import {validateResourceNW} from '../middlewares/validateResources.js';
import archivosSchema from '../validators/archivos.validation';

const archivosRouter = express.Router();

//Crear nuevo archivo.

archivosRouter.post('/',(req,res,next)=>{

    const validate = validateResourceNW(archivosSchema,req.body);
    
    if(validate.error == null){
       
        create(req,res);

    }else{
        res.status(400).send(validate.error);
    }

});

//obtener todos los  arcgivos

archivosRouter.get('/',getALl);

//obtener todos los archivos de una entidad.

archivosRouter.get('/:codREcaudador',findByCodRecaudador);

//buscar un archivo por id.
    
archivosRouter.get('/:id',findByid);

//aptualizar un archivo por id.
    
archivosRouter.put('/:id',(req,res,next)=>{

    const validate = validateResourceNW(archivosSchema,req.body);
    
    if(validate.error == null){

        updateById(req,res);

    }else{
        res.status(400).send(validate.error);
    }

});

//Borrar un archivo por id.

archivosRouter.delete('/:id',remove);

//borrar todos los archivos de un recaudador.

archivosRouter.delete("/codRecaudadores",removeAllByCodRecaudadores);

export {archivosRouter};
import express from 'express';

import { create, getAll , findByEntidad , updateById , remove } from './../controllers/formatonombreArchivos.controller.js';

import formatoNombreArchivosSchema from './../validators/formatoNombreArchivos.validation.js';

import {validateResourceNW} from '../middlewares/validateResources.js';

const formatoNombreArchivosRouter = express.Router();

//Crear nuevo formato de nombre de archivos.

formatoNombreArchivosRouter.post('/',(req,res,next)=>{

    const validate = validateResourceNW(formatoNombreArchivosSchema,req.body);
    
    if(validate.error == null){

        create(req,res);

    }
    else{
        console.log(validate.error);
        res.status(400).send(validate.error);
    }
})

//obtener todo los formatoNombreArchivos.

formatoNombreArchivosRouter.get("/",getAll);

//obtener todos los  formatos de nombre de archivos por entidad.

formatoNombreArchivosRouter.get("/entidad/:entidad",findByEntidad);

//aptualizar un formato de nombre de archivo por id.

formatoNombreArchivosRouter.put("/id/:id",(req,res,next)=>{

    //Verificar que los datos vengan en un buen formato.
    const validate = validateResourceNW(formatoNombreArchivosSchema,req.body);
    
    if(validate.error == null){
       
        updateById(req,res);

    }else{
        console.log(validate.error);
        res.status(400).send(validate.error);
    }

});

export {formatoNombreArchivosRouter};
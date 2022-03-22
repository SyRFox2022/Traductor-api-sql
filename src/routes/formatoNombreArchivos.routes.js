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
        res.status(400).send(validate.error);
    }
})


//obtener todo los recaudadores.

formatoNombreArchivosRouter.get("/",getAll);


export {formatoNombreArchivosRouter};
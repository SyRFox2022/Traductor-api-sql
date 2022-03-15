import express from 'express';

import { create , findByCodRecaudador , getAll , updateByCodRecaudador , remove } from  './../controllers/recaudadores.controller';

import {validateResourceNW} from '../middlewares/validateResources.js';

import recaudadoresSchema from '../schemas/recaudadores.validation.js';

const recaudadoresRouter = express.Router();

//Crear nuevo usuario.

recaudadoresRouter.post('/',(req,res,next)=>{


    const validate = validateResourceNW(recaudadoresSchema,req.body);
    
    if(validate.error == null){
        console.log("entro");
       
        create(req,res);

    }else{
        res.status(400).send(validate.error);
    }

});

//obtener un recaudador por codRecaudador.

recaudadoresRouter.get('/:codRecaudador',findByCodRecaudador);

//obtener todos los recaudadores.

recaudadoresRouter.get('/',getAll);

//actualizar un recaudador por cod.
    
recaudadoresRouter.put('/:codRecaudador',(req,res,next)=>{

    const validate = validateResourceNW(usuariosSchema,req.body);
    
    if(validate.error == null){
        console.log("entro");
       
        updateByCodRecaudador(req,res);

    }else{
        res.status(400).send(validate.error);
    }

});

//Borrar un recaudador por cod.

recaudadoresRouter.delete('/:codRecaudador',remove);

export {recaudadoresRouter};
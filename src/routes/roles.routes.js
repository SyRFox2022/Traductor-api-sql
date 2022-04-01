import express from 'express';

import { create , findById , updateById , remove , getAll } from './../controllers/roles.controller.js';

import {validateResourceNW} from '../middlewares/validateResources';

import rolesSchemas from '../validators/roles.validation';


const rolesRouter = express.Router();


//crear un nuevo rol.

rolesRouter.post('/',(req,res,next)=>{

    const validate = validateResourceNW(rolesSchemas,req.body);

    if(validate.error == null){

        create(req,res);

    }
    else{
        res.status(400).send({message: validate.error});
    }

});

//obtener un rol por id.

rolesRouter.get('/:id',findById);

//obtener todos los roles.
rolesRouter.get('/',getAll);

//Aptualizar un rol por id.

rolesRouter.put('/:Id',(req,res,next)=>{

    const validate = validateResourceNW(rolesSchema,req.body);
    
    if(validate.error == null){
        
        updateById(req,res);

    }else{
        res.status(400).send({message: validate.error});
    }

});

//borrar un rol.

rolesRouter.delete('/:Id',remove);


export {rolesRouter};
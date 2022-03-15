import express from 'express';
import {validateResourceNW} from '../middlewares/validateResources.js';
import usuariosSchema from '../schemas/usuario.validation.js';
import { create , findByMail , getAll , updateById , remove } from  './../controllers/usuarios.controller';
import {validateExistenceUser} from "../middlewares/validateExistenceUser.js";

const usersRouter = express.Router();

//Crear nuevo usuario  usuarios.create.

usersRouter.post('/',(req,res,next)=>{

    const validate = validateResourceNW(usuariosSchema,req.body);
    
    if(validate.error == null){

        validateExistenceUser(req.body.mail,(err,data)=>{


            if(err){
                console.log(err,'error');
                res.status(500).send({
                    message: "Error al intentar crear un usuario."
                })
            }
            
            else{
    
                if(data === false){
            
                    create(req,res);

                }
                else{
                    res.status(400).send({message:"Ya existe un usuario con esa Email"});
                }
            }

        });
        
    }else{
        res.status(400).send(validate.error);
    }
});

//obtener un usuario por Mail.

usersRouter.get('/:mail',findByMail);

//obtener todos los usuarios

usersRouter.get('/',getAll);

//aptualizar un usuario por id.
    
usersRouter.put('/:id',(req,res,next) =>{

    const validate = validateResourceNW(usuariosSchema,req.body);
    
    if(validate.error == null){
        console.log("entro");
       
        updateById(req,res);

    }else{
        res.status(400).send(validate.error);
    }

});

//Borrar un usuario por id.

usersRouter.delete('/:id',remove);

export { usersRouter };
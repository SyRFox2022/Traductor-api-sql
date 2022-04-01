import express from 'express';
import {validateResourceNW} from '../middlewares/validateResources.js';
import usuariosSchema from '../validators/usuario.validation.js';
import { create , findByMail , getAll , updateById , remove , findById } from  './../controllers/usuarios.controller';
import {validateExistenceUser} from "../middlewares/validateExistenceUser.js";

const usersRouter = express.Router();

//Crear nuevo usuario  usuarios.create.

usersRouter.post('/',(req,res,next)=>{

    //verificar que los datos llegen en un buen formato.
    const validate = validateResourceNW(usuariosSchema,req.body);
    
    //si el formato esta en orden , verificar si el usuario que se intenta crear
    // ya existe
    if(validate.error == null){

        validateExistenceUser(req.body.Mail,(err,data)=>{
    
            if(err){
                console.log(err,'error');
                res.status(500).send({
                    message: "Error al intentar crear un usuario."
                })
            }
            else{
                
                //si el usuario no existe, crearlo.
                if(data === false){
            
                    create(req,res);

                }

                else{
                    console.log("error al intentar crear un usuario: ya existe el usuario con ese mail.");
                    res.status(400).send({message:"Ya existe un usuario con ese Email, por favor utilice otro mail."});
                }
            }

        });
        
    }else{
        console.log(validate.error);
        res.status(400).send({message:validate.error});
    }
});

//obtener un usuario por Mail.

usersRouter.get('/:mail',findByMail);


//buscar por id.

usersRouter.get('/Buscar/:id',findById);
//obtener todos los usuarios

usersRouter.get('/',getAll);

//aptualizar un usuario por id.
    
usersRouter.put('/:id',(req,res,next) =>{

    //Verificar que los datos vengan en un buen formato.
    const validate = validateResourceNW(usuariosSchema,req.body);
    
    if(validate.error == null){
       
        updateById(req,res);

    }else{
        console.log(validate.error)
        res.status(400).send(validate.error);
    }

});

//Borrar un usuario por id.

usersRouter.delete('/:id',remove);

export { usersRouter };
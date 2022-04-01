import express from 'express';

import { create , findByCodRecaudador , getAll , updateByCodRecaudador , remove } from  './../controllers/recaudadores.controller';

import {validateResourceNW} from '../middlewares/validateResources.js';

import recaudadoresSchema from '../validators/recaudadores.validation.js';

import { validateExistenceRecaudador } from '../middlewares/validateExistenceRecaudador';

import { validateRole } from "./../middlewares/validateRole.js";

const recaudadoresRouter = express.Router();

//Crear nuevo usuario.

recaudadoresRouter.post('/',(req,res,next)=>{

    const validate = validateResourceNW(recaudadoresSchema,req.body);
    
    if(validate.error == null){
        
        validateExistenceRecaudador(req.body.codRecaudadores,(err,data)=>{
        
        if(err){
            
            console.log(err,'error');
            res.status(500).send({
                message: "Error al intentar crear un Recaudador."
            });

        }
        else{
            if(data === false){

                create(req,res);      
            
            }
            else{
            
                res.status(400).send({message:"El ente Recaudador Ya existe."});
            
            }

        }
        })

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

    const validate = validateResourceNW(recaudadoresSchema,req.body);
    
    if(validate.error == null){
       
        updateByCodRecaudador(req,res);

    }else{
        res.status(400).send(validate.error);
    }

});

//Borrar un recaudador por cod.

recaudadoresRouter.delete('/:codRecaudador', (req,res,next) =>{

    validateRole(req.headers.permiso,req.headers.usuariorolid,(err,validacion)=>{
        
        if(err){
            console.log(err,'error');
            res.status(500).send({
                message: err.sqlMessage
            })
        }

        //verificar que tenga el rol.
        if(validacion == true){

            remove(req,res);
        }
        else{
            console.log("No tiene permisos para realizar es accion.");
            res.status(401).send({message:"No tienes permisos necesarios."});
        }

    });

});


export {recaudadoresRouter};
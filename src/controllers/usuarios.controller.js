import {usuarios} from "./../models/usuarios.model";
import { v4 as uuidv4 } from 'uuid';
import { getToken , getTokenData } from './../utilities/jwt.js'
import { getTemplate , sendEmail } from './../utilities/sendMails';
import {connection as sql} from './../utilities/db.js';

 
//Crear un nuevo usuario.
export const create = (req,res) =>{

    //verificar que el usuario no venga vacio.
    if(!req.body){
        res.status(400).send(
        {
            message:'El contenido no puede estar vacio,por favor rellene los campos.',
        })
    }   

    //obtener codigo.
    const codev4 = uuidv4();

    //creando un objeto para guardar los datos recibidos del front end.
    const usuario ={

        Status: req.body.Status,
        Role: req.body.Role,
        Mail: req.body.Mail,
        FirstName:req.body.FirstName,
        LastName: req.body.LastName,
        Company: req.body.Company,
        Password: req.body.Password,
        IdRol:req.body.IdRol,
        code: codev4,
        validate:0,
  
    }
    const email = usuario.Mail;
    //obtener el token
    const token = getToken({ email , codev4 })

    //Guardar el usuario en la base de datos.

    usuarios.create(usuario,(err,data)=>{

        if(err){
        res.status(500).send({
            message: err.message || "A ocurrido un error al intentar crear el usuario."
        })
        }
        else{

            //enviar mail de confirmacion.
            const templete = getTemplate(usuario.FirstName , token);

            sendEmail(usuario.Mail,"Traductor:Mail de confirmacion",templete);

            //enviar data al frontend.
            res.send(data);
        }
    })

}

//buscar un usuario por Mail.

export const findByMail = (req,res) => {

    usuarios.findByMail(req.params.mail,(err,data)=>{

      if(err){

        //Si no se encuentra ningun usuario con ese mail.
        if(err.kind === 'No_Encontrado'){ 
            res.status(404).send({
                message:`No podimos encontrar un usuario con el mail: ${req.params.mail} `
            })
        }
        else{
            res.status(500).send({
                message: `Error al intentar buscar por el mail: ${req.param.mail}`
            })
        }
      }  
      else{
        console.log("usuarios obtenido");
        res.send(data);
      }

    })
}

//buscar por id.

export const findById = (req,res) => {

    usuarios.findByid(req.params.id,(err,data)=>{

      if(err){

        //Si no se encuentra ningun usuario con ese id.
        if(err.kind === 'No_Encontrado'){ 
            res.status(404).send({
                message:`No podimos encontrar un usuario con el id: ${req.params.id} `
            })
        }
        else{
            res.status(500).send({
                message: `Error al intentar buscar por el id: ${req.param.id}`
            })
        }
      }  
      else{
        console.log("usuarios obtenido");
        res.send(data);
      }

    })
}
//obtener todos los usuarios.


export const getAll = (req,res) =>{
    
    usuarios.getAll((err,data)=>{

        if(err){
            res.status(500).send({
                message:
                    err.message || "Error al intentar obtener todo los usuarios."
            })
        }
        else{
            console.log('obtenidos todos los usuarios.');
            res.json(data);
        }
    })
}


//aptualizar un usuarios por id.

export const updateById = (req,res) =>{

    if(!req.body){
        res.status(400).send({
            message: "EL contenido esta vacio y no se puede realizar la aptualizacion."
        });
    }

    console.log(req.body);

    usuarios.updateById(
        req.params.id,
        req.body,
        (err,data) =>{
            if(err){
                if(err.kind === 'No_Encontrado'){
                    res.status(404).send({
                        message: "No encontrado el usuario."
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


//BOrrar un usuario por id.

export const remove = (req, res) => {
    usuarios.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "No_encontrado") {
          res.status(404).send({
            message: `No encontarmos usuario con el id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "No pudimos eliminar el usuario con id " + req.params.id
          });
        }
      } else res.send({ message: `Usuario eliminado con exito.` });
    });
  };


//confirmar cuenta de un usuario.

export const validateUser = async (req,res,resultado) =>{

    //obtener el token

    const { token } = req.params;

    //verificar la data

    const data = await getTokenData(token);

    if(data === null){

        return resultado(0);
    }

    //verificar existencia del usuario.

    const { email , codev4  } = data.data;

    const user = await sql.query(`SELECT * FROM usuarios WHERE mail = "${ email }"`,async (err,res)=>{

        //Error

        if(err){
            return resultado(0);
        }
    
        //si el usuario no existe , enviar un message.
         
        if(res.length == 0){

            return resultado(2);
            
        }

        //si existe el usuario.
        
        if(res.length){
                
            //verificar codigo.
            if(codev4 != res[0].code){

                return resultado(0);
            
            }

            //aptualizar usuario.
            
            sql.query(`UPDATE usuarios set validate = 1 WHERE mail = "${ res[0].Mail }"`,async (err,res)=>{

                //Error
                if(err){
                    resultado(err,null);
                    return resultado(1);
                }
        
            })

            //redirrecionar a la confirmacion.

            return resultado(1);

        }

       
    }
    )

}
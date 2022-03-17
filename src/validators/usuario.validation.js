import joi from "@hapi/joi";

const usuariosSchema  = joi.object({

    status: joi.string().required().max(1).min(1),
    role : joi.string().required().max(15).min(1),
    mail : joi.string().email().required().max(30).min(1),
    firstName: joi.string().required().max(30).min(1),
    lastName: joi.string().required().max(30).min(1),
    company: joi.string().required().max(50).min(1),
    password: joi.string().required().max(50).min(1),
    
})


export default  { usuariosSchema }











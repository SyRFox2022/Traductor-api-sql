import joi from "@hapi/joi";

const usuariosSchema  = joi.object({

    Status: joi.string().required().max(1).min(1),
    Role : joi.string().required().max(15).min(1),
    Mail : joi.string().email().required().max(80).min(1),
    FirstName: joi.string().required().max(80).min(1),
    LastName: joi.string().required().max(80).min(1),
    Company: joi.string().required().max(50).min(1),
    Password: joi.string().required().max(50).min(1),
    IdRol: joi.number().required().min(1)

})


export default  { usuariosSchema }











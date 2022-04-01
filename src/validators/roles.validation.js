import joi from "@hapi/joi";

const rolesSchema = joi.object({

    Nombre: joi.string().required().max(30).min(1),
    EditEntidades: joi.number().required().max(1).min(1),
    EditArchivos: joi.number().required().max(1).min(1),
    DeleteEntidades: joi.number().required().max(1).min(1),
    DeleteArchivos: joi.number().required().max(1).min(1),
    CreateEntidades: joi.number().required().max(1).min(1),
    CreateArchivos: joi.number().required().max(1).min(1),
    A_CreateUsuarios: joi.number().required().max(1).min(1),
    A_EditUsuarios: joi.number().required().max(1).min(1),
    A_DeleteUsuarios: joi.number().required().max(1).min(1),
    A_CreateRoles: joi.number().required().max(1).min(1),
    A_EditRoles: joi.number().required().max(1).min(1),
    A_DeleteRoles: joi.number().required().max(1).min(1),
    A_MakeAdmin: joi.number().required().max(1).min(1),
    A_DoubleVer: joi.number().required().max(1).min(1),


})

export default {rolesSchema};
import joi from "@hapi/joi";

const recaudadoresSchema  = joi.object({

    codRecaudadores: joi.number().required().max(4).min(1),
    nombre : joi.string().required().max(15).min(1),
    tipoArchivo : joi.string().required().max(2).min(1),
    estado: joi.string().required().max(1).min(1),
    idPrograma: joi.number().required().max(30).min(1),
    
})


export default  { recaudadoresSchema }




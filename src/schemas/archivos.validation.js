import joi from "@hapi/joi";

const archivoSchema  = joi.object({

    nombre: joi.string().required().max(1).min(1),
    entidad : joi.string().required().max(15).min(1),
    idFormato : joi.number().required().max(30).min(1),
    fecha: joi.date().required().max(30).min(1),
    tipoArchivo: joi.string().required().max(1).min(1),
    codRecaudadores: joi.number().required().max(4).min(1),
    
})


export default  { archivoSchema }






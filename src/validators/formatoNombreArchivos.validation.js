import joi from "@hapi/joi";

const formatoNombreArchivosSchema  = joi.object({

    nombre: joi.String().required().max(20).min(1),
    archivo : joi.number().required().min(1),
    estado : joi.string().required().max(2).min(1),
    tipoArchivo: joi.string().required().max(1).min(1),
    entidad: joi.number().required().max(30).min(1),
    
})


export default  { formatoNombreArchivosSchema }




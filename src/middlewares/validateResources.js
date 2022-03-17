/**
 * Valida los datos que entran por POST O PUT antes que entren al end-point.
 * si estan mal los datos , manda un 404 al front end.
 * @param {schema} schema un esquema de yup referente a los archivos.
 * @param {body}   body  Datos de la consulta proveniente del front-end.
 */

const validateResourceNW = (schema , body) => {

    try {
        
        return schema.usuariosSchema.validate(body);
        
        
    } catch (err) {
        const { message } = err;
        return message;
    }
}

export {validateResourceNW};
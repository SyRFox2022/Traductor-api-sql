/**
 * Valida los datos que entran por POST O PUT antes que entren al end-point.
 * si estan mal los datos , manda un 404 al front end.
 * @param {*} schema un esquema de yup referente a los archivos.
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
const archivos = require('./../controllers/archivos.controller.js');

let router = require("express").Router();

//Crear nuevo usuario.

router.post('/',archivos.create);

//obtener todos los archivos.

router.get('/',archivos.getALl);

//obtener todos los archivos de una entidad.

router.get('/:codREcaudador',archivos.findByCodRecaudador);

//buscar un archivo por id.
    
router.get('/:id',archivos.findByid);


//buscar un archivo por id.
    
router.put('/:id',archivos.updateByid);

//Borrar un recaudador por id.

router.delete('/:id',archivos.remove);


module.exports = router;
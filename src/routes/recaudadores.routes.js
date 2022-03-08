const recaudadores = require('./../controllers/recaudadores.controller.js');

let router = require("express").Router();

//Crear nuevo usuario.

router.post('/',recaudadores.create);


//obtener un recaudador por codRecaudador.

router.get('/:codRecaudador',recaudadores.findByCodRecaudador);

//obtener todos los recaudadores.

router.get('/',recaudadores.getAll);

//actualizar un recaudador por id.
    
router.put('/:codRecaudador',recaudadores.updateByCodRecaudador);

//Borrar un recaudador por id.

router.delete('/:codRecaudador',recaudadores.remove);

module.exports = router;
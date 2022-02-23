const usuarios = require('./../controllers/usuarios.controller');

let router = require("express").Router();

//Crear nuevo usuario.

router.post('/',usuarios.create);


//obtener un usuario por Mail.

router.get('/:mail',usuarios.findByMail);


//obtener todos los usuarios

router.get('/',usuarios.getAll);

//aptualizar un usuario por id.
    
router.put('/:id',usuarios.updateById);

//Borrar un usuario por id.

router.delete('/:id',usuarios.remove);

module.exports = router;
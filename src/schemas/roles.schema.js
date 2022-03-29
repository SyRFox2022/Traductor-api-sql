const roles = function(rol){

    this.nombre = rol.nombre,
    this.editEntidades = rol.editEntidades,
    this.editArchivos = rol.editArchivos,
    this.deleteEntidades = rol.deleteEntidades,
    this.deleteArchivos = rol.deleteArchivos,
    this.createEntidades = rol.createEntidades,
    this.crateArchivos = rol.crateArchivos,
    this.A_createUsuarios = rol.A_createUsuarios,
    this.A_editUsuarios = rol.A_editUsuarios,
    this.A_deleteUsuarios = rol.A_deleteUsuarios,
    this.A_createRoles = rol.A_createRoles,
    this.A_editRoles = rol.A_editRoles,
    this.A_deleteRoles = rol.A_deleteRoles,
    this.A_makeAdmin = rol.A_makeAdmin,
    this.A_doubleV = rol.A_doubleV

}

export default {roles};
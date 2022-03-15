const usuarios = function(usuario){

    this.id = usuario.id,
    this.status = usuario.status,
    this.role = usuario.role,
    this.mail = usuario.mail,
    this.firstName = usuario.firstName,
    this.lastName = usuario.lastName,
    this.company = usuario.company,
    this.password = usuario.password

};


export default {usuarios};
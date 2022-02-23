const mysql = require('mysql');
const dbConfig = require('./../config/db.config.js');

//crear conexion a la base de datos.
const connection = mysql.createConnection({

    host:dbConfig.HOST,
    user:dbConfig.USER,
    password:dbConfig.PASSWORD,
    database:dbConfig.DB,

});

//abrir conexion con mysql.
connection.connect(error =>{

    if(error) throw error;
    console.log('Conexion con la base de datos exitosa.');
})

module.exports = connection;












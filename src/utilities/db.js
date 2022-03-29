import mysql from 'mysql';
import {dbconfig} from './../config/db.config.js';


//crear conexion a la base de datos.
const connection = mysql.createConnection({

    host:dbconfig.HOST,
    user:dbconfig.USER,
    password:dbconfig.PASSWORD,
    database:dbconfig.DB,

});

//abrir conexion con mysql.
connection.connect(error =>{

    if(error) throw error;
    console.log('Conexion con la base de datos exitosa.');
})

export  { connection } ;











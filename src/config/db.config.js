import dotenv from "dotenv";

dotenv.config();

let dbconfig ={

    'HOST':process.env.HOST_DB,
    'USER':process.env.USER_DB,
    'PASSWORD':process.env.PASSWORD_DB,
    'DB':process.env.DB
    
};

export {dbconfig} ;

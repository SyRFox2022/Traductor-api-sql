import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config(); 

//obtener tokens.
const getToken = (payload) =>{

    return jwt.sign({
        data: payload
    },process.env.SECRET_TOKEN,{expiresIn: '24h'});

};

//obtener data del token.

const getTokenData = (token) =>{

    let data = null;

    jwt.verify(token,process.env.SECRET_TOKEN,(err,decoded)=>{

        if(err){
            console.log('Error al obtener data del token.');
        }
        else{
            data = decoded;
        }
    })

    return data;
}


export { getToken , getTokenData };
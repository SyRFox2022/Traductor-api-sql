import {transporter as tr} from './../config/mail.config.js';
import dotenv from "dotenv";

dotenv.config(); 

const sendEmail = async (email,subject,html) =>{

    try{
    
        await tr.sendMail({
            from: '"Syrfox" <testsyrfox@gmail.com>',
            to: email, 
            subject, 
            text: "Syrfox email",
            html, 
        });
        
        console.log("Mail enviado");
    }

    catch(error){
        console.log('Error al enviar el email:',error);
    }

}


const getTemplate = (nombre,token) =>{

    return `

            <body>
                
                <h2> bienvenido a traductor ${nombre} <h2>
                <p>para poder utilizar su cuenta ,ingrese  al siguiente link<p>
                
                <br/>

                <a
                    href="http://localhost:${process.env.PORT}/usuarios/confirmacion/${ token }"
                
                > confirmar cuenta </a>

                <br/>

                <p> Syr Fox S.A </p>

            </body>    
    
    `;

}

export { getTemplate , sendEmail };
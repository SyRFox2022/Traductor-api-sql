import dotenv from "dotenv";
import nodemailer from 'nodemailer';

dotenv.config(); 

const mail = {

    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS

}

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    tls:{
        rejectUnathorized: false
    },
    secure: false, // true for 465, false for other ports
    auth: {
      user: mail.user,
      pass: mail.pass, 
    },
  });


export { transporter };
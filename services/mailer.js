import nodemailer from 'nodemailer';
import {newToken, verify} from './token.js'

const transporter = nodemailer.createTransport ({
    host: "smtp.gmail.com",//servicio de gmail
    port: 465, //puerto que es seguro
    secure: true,
    auth: {//credenciales
        user: "alex.d4556@gmail.com",
        pass: "anochecer32",
    }
});

export const sendVerificatioEmail = (user) => {
    const token = newToken(user.id);
    const link = `localhost:3000/auth/verify/?token=${token}`
    sendMail(user.email, "Email verification", 
    `Muchas gracias por registrarte</br>
    verifica tu email <a href=${link}>aqui</a>`
    );
}


const sendMail = (toEmail, subject, body) => {
    const options = {
        from: "Alexis Diaz <alex.d4556@gmail.com>",//se le puede poner cualquier texto
        to: toEmail,//para quien va
        subject: subject, //asunto
        text: body//cuerpo del correo
        }
    transporter.sendMail(options).then(res => {
        console.log("Email sent")
    })
    .catch(err=>{
        console.log(err)
    })
 }
import nodemailer from 'nodemailer';
import {newToken} from './token.js'
const host = "smtp.sendgrid.net"//servicio de sendgrid
const port = 465
const user = "apikey"

export const sendVerificatioEmail = (user) => {
    const token = newToken(user.id);
    const link = `http://localhost:3000/auth/verify/?token=${token}`//Hay dos formas de enviar parametros. 1 con dos puntos y con signo de pregunta. Para extraer el valor de la ruta es distinto para cada uno
    sendHTMLMail(user.email, "Email verification", `
    Muchas gracias por registrarte</br>
    verifica tu email <a href=${link}>aqui</a>
    `);
}

const sendHTMLMail = (toEmail, subject, html) => {
    const transporter = nodemailer.createTransport ({
        host: host,//servicio de sendgrid
        port: port, //puerto que es seguro
        secure: true,
        auth: {//credenciales
            user: user,
            pass: process.env.SG_API_KEY,
        }
    });
    const options = {
        from: "Alexis Diaz Blog <softwaredevelopment992@gmail.com>",//se le puede poner cualquier texto
        to: toEmail,//para quien va
        subject: subject, //asunto
        html: html//cuerpo del correo
        }
    transporter.sendMail(options).then(res => {
        console.log("Email sent")
    })
    .catch(err=>{
        console.log(err)
    })
 }

const sendTextMail = (toEmail, subject, body) => {
    const transporter = nodemailer.createTransport ({
        host:host,//servicio de gmail
        port: port, //puerto que es seguro
        secure: true,
        auth: {//credenciales
            user:user,
            pass: process.env.SG_API_KEY,
        }
    });
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
const http = require('http');//se importa el servicio http. Este es un paqute incluido en node js
const express = require('express')//Se importa el modulo de express instalado sustituyendo fs
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');

const server = express();

server.use("/", indexRouter);//al usar use express solamente revisará la url y lo enviará a la ruta correspondiente
server.use("/auth", authRouter);//estando adentro del router el router se encargara de verificar el metodo usado y ejecutar la funcion que corresponde.

server.listen(8080);
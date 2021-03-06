import express from 'express'//Para crear el servidor, se instala aparte
import path from 'path'//libreria para establecer rutas. Se instala junto con node
import dotenv from 'dotenv'//libreria que sirve para crear variables globales, se instala aparte
import {connectDB} from './config/db.js'
import homeRouter from './routes/home.js'//es necesario poner el tipo de archivo para que funcione
import aboutRouter from './routes/about.js'
import blogRouter from './routes/blog.js'
import contactRouter from './routes/contact.js'
import authRouter from './routes/auth.js'
import session from 'express-session'//para crear una sesion, parecido a cookie

const result = dotenv.config()//busca un archivo .env vera lo que hay adentro y creara variables de entorno
if(!result.error){
    
    connectDB()//se manda a llamar a la conexion
    console.log('---------ho hay error----------')
    // console.log(process.env.DB_PWD)
    // console.log(process.env.DB_USER)
    // console.log(process.env.DB_URI)
}
const server = express();

//crear sesion
server.use(session({
    secret:"sd3r4k45h45f"
}));

server.use(express.static(path.join(process.cwd(),'public')));

server.set('views', path.join(process.cwd(), "views"));
server.set('view engine', 'ejs');

server.use('/', homeRouter);
server.use('/about', aboutRouter);
server.use('/blog', blogRouter);
server.use('/contact', contactRouter)
server.use('/auth', authRouter)

server.listen(3000);
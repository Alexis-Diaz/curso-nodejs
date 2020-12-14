import express from 'express'
import path from 'path'

import homeRouter from './routes/home.js'//es necesario poner el tipo de arachivo para que funcione
import aboutRouter from './routes/about.js'
import blogRouter from './routes/blog.js'
import contactRouter from './routes/contact.js'


const server = express();
server.use(express.static(path.join(process.cwd(),'public')));
server.set('views', path.join(process.cwd(), "views"));
server.set('view engine', 'ejs');

server.use('/', homeRouter);
server.use('/about', aboutRouter);
server.use('/blog', blogRouter);
server.use('/contact', contactRouter)

server.listen(8080);
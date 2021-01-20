import express from 'express'
import controller from '../controllers/blog.js'
import bodyParser from 'body-parser'
import {protectedMid} from '../middleware/middleware.js'

const router = express.Router()

router.use(bodyParser.urlencoded({extended:true}));
router.get('/', controller.renderBlog);
router.get('/new-post', protectedMid, controller.renderNewPost);//se verifica en ruta que tipo de peticion es
router.post('/new-post', protectedMid, controller.newPost)//primero se llama la funcion protectedMid y si esta llama next pasa a la siguiente
router.get('/detail/:id', controller.detail)//despues de los dos puntos express entiende que es un parametro

export default router
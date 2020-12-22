import express from 'express'
import controller from '../controllers/blog.js'
import bodyParser from 'body-parser'

const router = express.Router()

router.use(bodyParser.urlencoded({extended:true}));
router.get('/', controller.renderBlog);
router.get('/new-post', controller.renderNewPost);//se verifica en ruta que tipo de peticion es
router.post('/new-post', controller.newPost)
router.get('/detail/:id', controller.detail)//despues de los dos puntos express entiende que es un parametro


export default router
import {Post} from '../models/post.js'

export const renderBlog = (req, res) => {
    Post.find((err, posts) => {//busca todas la collecion de post
        res.render('blog.ejs', {path: "Blog", posts : posts});
    }) 
}

export const renderNewPost = (req, res) => {
    const cookie = req.get('Cookie')//esta linea sirve para requerir la cookie cuando peticione la vista nuevo post y saber quien es
    console.log(typeof(cookie))
    res.render('new-post.ejs', {path:"New Post"});
} 

export const newPost = (req,res) => {
    const postRecibido = new Post({date: req.body.date, title: req.body.title, body: req.body.body})//se crea una instancia del modelo creado
    postRecibido.save((err)=>{
        res.redirect('/blog');//redirecciona a la pagina indicada
    })
}

export const detail = (req,res) => {
    Post.findById(req.params.id, (err, posts) =>{
        res.render('post-detail.ejs', {path:"detail post", post:posts})
    })
}

export default {renderBlog, newPost, renderNewPost, detail}
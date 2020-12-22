import {Post} from '../models/post.js'

export const renderBlog = (req, res) => {
    Post.find((err, posts) => {
        res.render('blog.ejs', {path: "Blog", posts : posts});
    }) 
}

export const renderNewPost = (req, res) => {
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
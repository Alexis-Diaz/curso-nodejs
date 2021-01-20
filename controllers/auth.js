import {User} from '../models/user.js'
import bcrypt from 'bcrypt'//este paquete se usa para hashear la contraseña
import {sendVerificatioEmail} from '../services/mailer.js'
import {verify} from '../services/token.js'
import expressSession from 'express-session'
//las funciones render sirven para servir la vista silicitada
export const renderRegister = (req, res)=>{
    res.render("registration.ejs", {path:"Registration", errorMessage: {message:"sin_error"}});
}

export const renderLogin = (req, res)=>{
  //primero se verifica si existe un parametro de ruta, en caso de haber significa que alguien quiere hacer un post sin estar logueado.
    if (!req.params.error){
          //nombre cabecera, pasando cualquier valor
    res.setHeader('Set-Cookie', 'logedIn=true')//para crear una cokie y enviarla en la cabecera
    res.render("login.ejs", {path:"Login", errorMessage:{message:"sin_error"}});
    }else{
          //nombre cabecera, pasando cualquier valor
    res.setHeader('Set-Cookie', 'logedIn=true')//para crear una cokie y enviarla en la cabecera
    res.render("login.ejs", {path:"Login", errorMessage:{message:"Por favor inicia sesion o crea una cuenta para escribir un post", alert: "uk-alert-danger"}});
    }
}

//Esta funcion sirve para hashear el pasword. Hash es diferente a encriptar
const hashPassword = (password, res, callback) => {
    bcrypt.hash(password, 10, (error, hash) => {
        if (error) {
            console.log(error);
            return res.status(500).send({error: "Something went wront"})
        }else{
            console.log("se hizo el hash")
            callback(hash);
        }
    });
}

export const register = (req, res) => {
    //primero se verifica que los campos esten llenos
    if (req.body.fullname === '' || req.body.email === '', req.body.password === ''){
        res.render("registration.ejs", {path:"Registration", errorMessage: {message: "User information is missing", alert: "uk-alert-danger"}})
        res.end();
    }
   //si hay informacion primero se procesa y el password se hashea
    const {fullname, email, password} = req.body;
    const [firstName, lastName] = fullname.split(' ');
    hashPassword(password, res, (hash) => {
        const newUser = new User({firstName:firstName, lastName:lastName, email:email, password:hash})
        newUser.save()//aqui se guarda el usuario
        .then((user) => {
            req.session.userId = user._id// a la session se le pega el idUsuario
            console.log(req.session + "session creada con id")
            req.session.save(err=>{
                if(!err){
                    console.log("entro en el then de save user")
                    sendVerificatioEmail(user)
                    res.render("registration.ejs", {path:"Registration", errorMessage: {message: "Por favor, revisa tu correo y confirma con el enlacer verificación", alert: "uk-alert-primary"}})
                }
            });
           
            //return res.redirect('/');
            //res.render("registration.ejs", {path:"Registration", errorMessage: {message:"User created successfully", alert:"uk-alert-success"}})
            //res.end();
        })
        .catch(err => {
        console.log("entro en el catch de save user "+email);
        //res. renderRegister.status(409).json({message: "Invalid Email"});
        res.render("registration.ejs", {path:"Registration", errorMessage: {message: "Email already exist", alert: "uk-alert-danger"}})
        //res.status(500).end();
        res.end();
        })
    })
}

export const login = (req, res) => {
    const {email, password} = req.body;
    if(email === "" || password === ""){
        res.render("login.ejs", {path:"Registration", errorMessage: {message: "Please complete the information", alert: "uk-alert-danger"}})
        //return res.status(400).send({message: "Invalid Credentials"})
    }

    User.findByEmailAndComparePassword(email, password)
    .then(({isValid, user}) => {
        if(isValid){
            req.session.userId = user._id// cuando se inicia session a la session se le pega el idUsuario
            res.redirect('/')
        }
    })
    .catch( err => {
        res.render("login.ejs", {path:"Registration", errorMessage: {message: "Invalid Credentials", alert: "uk-alert-danger"}})
    })
    //Esta funcion se paso al modelo para hacerla reutilizable
    // User.findOne({email: email}, (err, user) => {
    //     if (user) {
    //         bcrypt.compare(password, user.password, (err, isValid) => {
    //             console.log(err, isValid)
    //             if( isValid) {
    //                 return res.redirect('/')
    //             }else{
    //                 res.render("login.ejs", {path:"Registration", errorMessage: {message: "Invalid Credentials", alert: "uk-alert-danger"}})
    //                 //return res.status(400).send({message:"Invalid Credentials"})
    //             }
    //         })
    //     }
    // })
}

//esta funcion sirve para verificar el token por medio del enlace enviado al correo del usuario
export const renderHomeEmailVerification = (req, res) => {//se ha usado query params para estraer el valor del token se usa req.query.nombreDelParametro
    const userVerification = verify(req.query.token)
    if(userVerification.valid === false && userVerification.key === null){
        res.render("registration.ejs", {path:"Registration", errorMessage: {message: "Token invalid", alert: "uk-alert-danger"}})
    }else{
        User.findById(userVerification.key, (err, users) =>{
            console.log(users)
            User.updateOne({_id:users._id},{emailVerified:true})
            .then(
                console.log("USUARIO ACTUALIZADO"),
                res.render("index.ejs", {path:"Home"})
            )
            .catch( error =>{
                console.log("algo anda mal " + error)
            })
        })
    }
}
export default {renderRegister, renderLogin, register, login, renderHomeEmailVerification}
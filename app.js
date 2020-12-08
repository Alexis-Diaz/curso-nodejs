const express = require('express');
const authRouter = require(__dirname+'/routes/auth.js');
const server = express();

server.use("/auth", authRouter);

server.get("/", (req, res)=>{
    res.send("Index hola mundo");
})

server.listen(8080);
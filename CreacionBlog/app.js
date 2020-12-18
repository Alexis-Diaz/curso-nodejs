const http = require('http');//se importa el servicio http. Este es un paqute incluido en node js
const { listenerCount } = require('process');

// //FORMA 1
// const hostname = 'localhost';
// const port = 3000;

// //Esta funcion sirve de servidor para la aplicacion. La callback tiene los parametros de request y respond (peticion y respuesta)
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;//Este es un estado que se envia. Existen diferentes numeros que representan estados diferentes. En caso de no asignarse por defecto toma 200 ok
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hola Mundo');
// });

// server.listen(port, hostname, () => {
//   console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
// });

//FORMA 2
const server = http.createServer((req, res)=>{
  res.writeHead(200,{"Content-Type":"application/json"})//Aqui se escribe una cabecera el 200 es el estado y content-type el tipo de respuesta enviada.
  res.write('{mensaje: "Hola me llamaste"}')
  res.end();
})

server.listen(8080);
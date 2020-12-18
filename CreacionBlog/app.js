const http = require('http');//se importa el servicio http. Este es un paqute incluido en node js
const fs = require('fs')//modulo por defecto de node file system para trabajar con archivos

const server = http.createServer((req, res)=>{

  if(req.method==='GET' && req.url==="/index.html"){
    return index(req, res)
  }

  if(req.method==='GET' && req.url==="/nosotros.html"){
    return nosotros(req, res)
  }

  res.write('Hola 1')
  res.end();
})

function index(req, res){
  const stat = fs.statSync('./index.html');
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': stat.size//en vez de escribir un numero stat.size me da el tamaño automatico del archivo
  })

  const readStream = fs.createReadStream('./index.html')//tema a investigar que son los stream
  //pipe es pegarlo a otro
  readStream.pipe(res);
  //no se necesita re.ende porque cuando createReadStream termine el proceso cerrara automaticamente la llamada.
}

function nosotros (req, res){
  const stat = fs.statSync('./nosotros.html');
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': stat.size//en vez de escribir un numero stat.size me da el tamaño automatico del archivo
  })

  const readStream = fs.createReadStream('./nosotros.html')//tema a investigar que son los stream
  //pipe es pegarlo a otro
  readStream.pipe(res);
  //no se necesita re.ende porque cuando createReadStream termine el proceso cerrara automaticamente la llamada.
}
server.listen(8080);
import crypto from 'crypto';//se parece a bcryp pero tiene mas funcionalidad

//CREACION DE UN TOKEN DE VERIFICACION
const tokenSecret = "j0mvfn3JH9NHL6hjs"//valor random
const delimiter = "||"
const minutes = 60
const maxAgeMinutes = minutes * 2;//fecha de expiracion en minutos


//key es el id del usuario pero puede ser cualquier otra cosa
export const newToken = (key) => {
    //investigar que es sha256
    const hash = crypto.createHmac("sha256", tokenSecret)
    const timestamp = Date.now().toString()//se captura la fecha actual en segundos desde 1970
    const toHmac = key + timestamp;

    const sha = hash.update(toHmac).digest('hex')
    const toEncode = sha + delimiter + key + delimiter + timestamp
    return Buffer.from(toEncode).toString('base64');
}

export const verify = (token) => {
    const decoded = Buffer.from(token, 'base64').toString();
    const [hash, key, timestamp] = decoded.split(delimiter);
    const tiempoTranscurrido = Date.now().toString() - timestamp;
    if(tiempoTranscurrido > maxAgeMinutes) {
        console.log ("el tiempo caduco, es de: " + tiempoTranscurrido)
        return {valid:false, key:null}
    }
    const toCompare = crypto.createHmac('sha256', tokenSecret).update(key + timestamp).digest('hex');
    const valid = toCompare === hash
    return {valid,key}
}
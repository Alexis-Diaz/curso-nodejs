import mongoose from 'mongoose'
import bcrypt from "bcrypt"
const {Schema} = mongoose

//investigar algunas terminologias de mongoosejs.com
const userSchema = new Schema ({
    firstName: {
        type: String,
        required:[true, "First name is required"]
    },
    lastName: {
        type: String,
        required:[true, "Last name is required"]
    },
    email: {
        type: String,
        unique: true,
        required:[true, "Email is required"]
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required:[true, "Password is required"]
    },
});
    
userSchema.methods.isPasswordValid = async function(plainText) {
    const isValid = await bcrypt.compare(plainText, this.password)
    return isValid
}

//esta funcion sirve para buscar un usuario con el email ingresado y a la vez compara el password ingresado con el password hasheado en la BD
//la funcion recibe dos parametros el email y el password sin hash.
userSchema.statics.findByEmailAndComparePassword = function(email, textPassword){
    return new Promise ((resolve, reject) => {
        this.findOne({email:email})//findOne sirve para buscar una coincidencia usando el objeto pasado en la coleccion de la BD de mongo
            .then((user) =>{
                bcrypt.compare(textPassword, user.password)//Bcrypt regresa un boleano en caso de ser iguales true o diferentes false
                .then(isValid => {//isValid es la variable que almacena la respuesta de bcrypt
                resolve({isValid:isValid, user:user});
                })
                .catch(err => {
                    reject(err)
                })
            })
            .catch((err) =>{
                reject(err)
        })
    });
};

                                   //User indica que coleccion se debe usar. Mongoose automaticamente crea la coleccion en plural
export const User = mongoose.model('User', userSchema)
import mongoose from 'mongoose'//Esta libreria sirve para el manejo de conexion con mongo db

//Esta funcion sirve para conectar a la BD de Mongo
export const connectDB = async () => {
    const conn = await mongoose.connect(process.env.DB_URI,{useNewUrlParser:true});
    console.log(`Mongo db connected: ${conn.connection.host}`);
}
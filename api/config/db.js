import mongoose from "mongoose"; 
import dotenv from "dotenv";
dotenv.config()
const connectDB = async () =>{
    try{
        //Crear archivo .env en la ruta del API
        await mongoose.connect(process.env.DATABASE_URL,{
            dbName: "movies",
        });
        console.log('Mongodb conectado');
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;
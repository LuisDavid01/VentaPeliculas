import express from "express";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { createServer } from "node:http";
import connectDB from "./config/db.js";
import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";

//imports router
import movieRouter from "./routes/MoviesRoutes.js";
import salasRouter from "./routes/SalasRoutes.js";
import teatroRouter from "./routes/TeatroRoutes.js"
dotenv.config();
const port = process.env.PORT ?? 8901;
const app = express();
//app.use(express.json);
const server = createServer(app);

// Middleware
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors({
    origin: "*", // Origen del frontend
    methods: ["GET", "POST"],
    credentials: true
}));



const io = new Server(server,{
    cors: {
        origin: "http://127.0.0.1:5500", // CORS para Socket.IO
        methods: ["GET", "POST"],
        credentials: true
    },
    connectionStateRecovery: {}
});
//conexion a la base de datos
connectDB();


//socket logica
io.on('connection', async ( socket ) => {
    console.log('a user has connected')
    socket.on('disconnect', () => {
        console.log('a user has disconnected')
    })

    socket.on('disconnect', () => {
        console.log('a user has disconnected')
    })

    socket.on('comprar asiento', async (msg) => {
        
        
    })
});
//rutas del api
app.use('/api', movieRouter );
app.use('/api', salasRouter );
app.use('/api', teatroRouter );

server.listen(port, () => console.log(`Servidor corriendo en el puerto: ${port} `));




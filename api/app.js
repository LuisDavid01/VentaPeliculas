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
const server = createServer(app);

// Middleware del web
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors({
    origin: "*", // Cors del servidor http
    methods: ["GET", "POST"],
    credentials: true
}));


//creamos el servidor de WebSocket
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

    socket.on('comprar asiento', async (user) => {
        
        //to do: meter en cola al usuarios is hay sobrecarga en la pagina
    })
});
//rutas del api
app.use('/api', movieRouter );
app.use('/api', salasRouter );
app.use('/api', teatroRouter );

server.listen(port, () => console.log(`Servidor corriendo en el puerto: ${port} `));




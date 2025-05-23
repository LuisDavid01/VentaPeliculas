import express from "express";
//import { Server } from "socket.io";

//import { createServer } from "node:http";
import connectDB from "./config/db.js";
import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";
import compression from "compression";
import rateLimit from "express-rate-limit";
//imports router
import movieRouter from "./routes/MoviesRoutes.js";
import tipoSalaRouter from "./routes/TipoSalaRoutes.js"
import salasRouter from "./routes/SalasRoutes.js";
import teatroRouter from "./routes/TeatroRoutes.js";
import sesionRouter from "./routes/SesionRoutes.js";
import userRouter from "./routes/UsuariosRoutes.js";
import authRouter from "./routes/AuthRoutes.js";
import compraRouter from "./routes/CompraRoutes.js";
import webhookRouter from "./routes/WebhookRoutes.js";



const port = process.env.PORT ?? 8901;
const app = express();

//const server = createServer(app);
app.use(express.json({ limit: "10mb" }));
app.set("trust proxy", 1);
//inicializamos el rate limit
app.use(rateLimit({
	windowMs: 3000,
	limit: 200
}));

// Middleware del web

app.use(cors({
    origin: "*", // Cors del servidor http
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
// comprime las respuestas del api
app.use(compression({
	level: 3,
	threshold: 0
}));
// desactivamos el header x x-powered-by
app.disable('x-powered-by');

//creamos el servidor de WebSocket
//quizas deba desactivarlo...
/*
const io = new Server(server,{
    cors: {
        origin: "*", // CORS para Socket.IO
        methods: ["GET", "POST"],
        credentials: true
    },
    connectionStateRecovery: {}
});
*/
//conexion a la base de datos
connectDB();

/*
//socket logica
io.on('connection', async ( socket ) => {
    console.log('a user has connected')
    socket.on('disconnect', () => {
        console.log('a user has disconnected')
    })

   
    socket.on('comprar asiento', async (user) => {
        
        //to do: meter en cola al usuarios is hay sobrecarga en la pagina
    })
});
*/
//rutas del api
app.use(webhookRouter);
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api', movieRouter );
app.use('/api', tipoSalaRouter);
app.use('/api', salasRouter );
app.use('/api', sesionRouter);
app.use('/api', teatroRouter );
app.use('/api', userRouter );
app.use('/api', authRouter);
app.use('/api', compraRouter);

//iniciamos el servidor
app.listen(port, () => console.log(`Servidor corriendo en el puerto: ${port} `));




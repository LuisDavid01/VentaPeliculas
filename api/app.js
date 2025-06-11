import express from "express";
//import https from 'https';
//import fs from 'fs';
//import { config } from "./config/config.js";

//import { createServer } from "node:http";
import connectDB from "./config/db.js";
import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";
import compression from "compression";
import rateLimit from "express-rate-limit";
import mongoSanatizer from "express-mongo-sanitize";
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
import dulceriaRouter from "./routes/DulceriaRoutes.js";
import productoDulceriaRouter from "./routes/ProductoDulceriaRoutes.js";
import promocionesRouter from "./routes/PromocionesRoutes.js";
import helmet from "helmet";



const port = process.env.PORT ?? 42069;
const app = express();

//const server = createServer(app);
// cargamos el archivo .pfx y su passphrase
/*
const options = {
	pfx: fs.readFileSync('/app/certificate.pfx'),
	passphrase: config.CERTIFICATE_PASSWORD

};
*/
app.use(helmet());
//endpoint del webhook
app.use(webhookRouter);
app.use(bodyParser.json({ limit: "5mb" }));
app.use(mongoSanatizer())
app.set("trust proxy", 1);
//inicializamos el rate limit
app.use(rateLimit({
	windowMs: 27000,
	limit: 100
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

//conexion a la base de datos
connectDB();

//rutas del api

app.use(logger('dev'));

app.use('/api', movieRouter );
app.use('/api', tipoSalaRouter);
app.use('/api', salasRouter );
app.use('/api', sesionRouter);
app.use('/api', teatroRouter );
app.use('/api', userRouter );
app.use('/api', authRouter);
app.use('/api', compraRouter);
app.use('/api', dulceriaRouter);
app.use('/api', productoDulceriaRouter);
app.use('/api', promocionesRouter);
//creamos el servidor https
//const server = https.createServer(options, app)
//iniciamos el servidor
app.listen(port, () => console.log(`El servidor esta corriendo en: http://localhost:${port} `));




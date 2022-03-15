import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

//permite utilizar variables de entorno.
dotenv.config(); 

//import routers 
import { usersRouter } from "./routes/usuarios.routes.js";
import {recaudadoresRouter}  from "./routes/recaudadores.routes.js"
import {archivosRouter} from "./routes/archivos.routes.js"

let  corsOptions = {
  origin: "http://localhost:4000"
};

//middlewares.
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Traductor API SQL" });
});

//routes
app.use('/usuarios',usersRouter);
app.use('/recaudadores',recaudadoresRouter);
app.use('/archivos',archivosRouter);

//puerto del servidor
const PORT =  5000 ||  process.env.PORT;

app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto: ${PORT}.`);
});



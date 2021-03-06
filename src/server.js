import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';

const app = express();

//permite utilizar variables de entorno.
dotenv.config(); 

//import routers 
import { usersRouter } from "./routes/usuarios.routes.js";
import { recaudadoresRouter }  from "./routes/recaudadores.routes.js";
import { archivosRouter } from "./routes/archivos.routes.js";
import { formatoNombreArchivosRouter } from "./routes/formatoNombreArchivos.routes.js";
import { rolesRouter } from "./routes/roles.routes";

//configuraciones.
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('/public'));


app.get("/", (req, res) => {
  res.json({ message: "Traductor API SQL" });
}); 

//routes
app.use('/usuarios',usersRouter);
app.use('/recaudadores',recaudadoresRouter);
app.use('/archivos',archivosRouter);
app.use('/formatoNombre',formatoNombreArchivosRouter);
app.use('/roles',rolesRouter);


//puerto del servidor
const PORT =  5000 ||  process.env.PORT;

app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto: ${PORT}.`);
});

const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require('dotenv');

//permite utilizar variables de entorno.
dotenv.config(); 

//import routers 
let  usersRouter = require('./routes/usuarios.routes');
let  recaudadoresRouter = require('./routes/recaudadores.routes');
let archivosRouter = require('./routes/archivos.routes');

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
app.use('/recaudadores/archivos',archivosRouter);

//puerto del servidor
const PORT =  5000 ||  process.env.PORT;

app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto: ${PORT}.`);
});



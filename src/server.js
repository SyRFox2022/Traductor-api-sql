const express = require("express");
const cors = require("cors");
const app = express();

//import routers 

var usersRouter = require('./routes/usuarios.routes');

var corsOptions = {
  origin: "http://localhost:4000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Traductor API SQL" });
});

//routes
app.use('/usuarios',usersRouter);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto: ${PORT}.`);
});
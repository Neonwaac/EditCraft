const express = require('express');
const cors = require('cors')
const db = require('./db/db.js')
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes.js');
const plantillaRoutes = require('./routes/plantillaRoutes.js');
const comentarioRoutes = require('./routes/comentarioRoutes.js');
const path = require('path');
require('dotenv').config();
app.use(express.json());
app.use(cors());

db.connect((error) => {
    if(error){
        console.log(error);
        process.exit(1);
    }else{
        console.log('Conectado a la Database --| EditCraft |--')
    }
})
app.use("/uploads/images", express.static(path.join(__dirname, "uploads/images")));
app.use(usuarioRoutes);
app.use(plantillaRoutes);
app.use(comentarioRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log("Servidor corriendo en http://localhost:"+PORT)
})
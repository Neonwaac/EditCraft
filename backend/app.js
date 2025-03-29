const express = require('express');
const cors = require('cors')
const db = require('./db/db.js')
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes.js');
const plantillaRoutes = require('./routes/plantillaRoutes.js');
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
app.use(usuarioRoutes);
app.use(plantillaRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log("Servidor corriendo en http://localhost:"+PORT)
})
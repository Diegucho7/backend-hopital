require('dotenv').config();

const express = require('express');
const cors = require('cors');
const {dbConnection} = require ('./database/config');


// Crear el servidor express
const app = express();

// Configurar Cors
app.use(cors());


// Base de datos
dbConnection();

// Rutas

app.get( '/', (req, res) =>{

    res.json({
        ok:true,
        msj:'Hola mundo'
    })

});

app.listen(3000, ()=>{
    console.log('Servidor corriendo en puerto '+ process.env.PORT )
});
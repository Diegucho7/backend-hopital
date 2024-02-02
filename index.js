require('dotenv').config();

const express = require('express');
const cors = require('cors');
const {dbConnection} = require ('./database/config');


// Crear el servidor express
const app = express();

// Configurar Cors
app.use(cors());

// Lectura y Parseo del body
app.use(express.json() );


// Base de datos
dbConnection();

// Rutas

app.use('/api/usuarios', require('./router/usuarios'));
app.use('/api/hospitales', require('./router/hospitales'));
app.use('/api/medicos', require('./router/medicos'));
app.use('/api/todo', require('./router/busquedas'));
app.use('/api/todo/coleccion', require('./router/busquedas'));
app.use('/api/login', require('./router/auth'));
app.use('/api/upload', require('./router/upload'));



app.listen(3000, ()=>{
    console.log('Servidor corriendo en puerto '+ process.env.PORT )
});


const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
const app = express();
const port = 3000;

const pool = new Pool({
    user: 'default', // Reemplaza con tu usuario de PostgreSQL
    host: 'ep-restless-breeze-a4rx7skq.us-east-1.aws.neon.tech',
    database: 'tagygames', // Reemplaza con el nombre de tu base de datos
    password: 'dTCRs3IUOlS1', // Reemplaza con tu contraseña de PostgreSQL
    port: 5432, // Puerto de PostgreSQL
});

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar la inserción de datos
app.post('/api/insert', async (req, res) => {
    const { pregunta, usuario, nombre, apellido, contraseña } = req.body;
    
    try {
        const result = await pool.query(
            'INSERT INTO Usuario (pregunta, usuario, nombre, apellido, contraseña) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [pregunta, usuario, nombre, apellido, contraseña]
        );
        res.status(200).json({ message: 'Datos insertados correctamente', user: result.rows[0] });
    } catch (err) {
        console.error('Error insertando datos:', err);
        res.status(500).json({ message: 'Error al insertar los datos' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

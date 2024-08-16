const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = 3003;
const pool = new Pool({
    user: 'default',       
    host: 'ep-restless-breeze-a4rx7skq.us-east-1.aws.neon.tech',
    database: 'tagygames', 
    password: 'dTCRs3IUOlS1',
    port: 5432,
    ssl: { rejectUnauthorized: false } 
});

app.use(bodyParser.json());

app.post('/registrar', async (req, res) => {
    console.log(req.body); 
    const { usuario, nombre, apellido, pregunta, contraseña } = req.body;

    try {
        const query = `
            INSERT INTO Usuario (usuario, nombre, apellido, pregunta, contraseña)
            VALUES ($1, $2, $3, $4, $5)
        `;
        await pool.query(query, [usuario, nombre, apellido, pregunta, contraseña]);
        res.status(201).send('Usuario registrado correctamente');
    } catch (error) {
        console.error('Error al insertar datos:', error);
        res.status(500).send('Error al registrar el usuario');
    }
});


app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

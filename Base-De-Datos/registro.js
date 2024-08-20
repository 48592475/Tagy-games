const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = 3012;  

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
        const queryUsuario = `
            SELECT * FROM usuario WHERE usuario = $1
        `;
        const resultado = await pool.query(queryUsuario, [usuario]);

        if (resultado.rows.length > 0) {
            res.status(400).send('El nombre de usuario ya existe. Por favor, elige otro.');
        } else {
            const queryregistro = `
                INSERT INTO usuario (usuario, nombre, apellido, pregunta, contraseña)
                VALUES ($1, $2, $3, $4, $5)
            `;
            const result = await pool.query(queryregistro, [usuario, nombre, apellido, pregunta, contraseña]);
            res.status(201).send('Usuario registrado correctamente');
        }
    } catch (error) {
        console.error('Error al insertar datos:', error.message);
        res.status(500).send(`Error al registrar el usuario: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

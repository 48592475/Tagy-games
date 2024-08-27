const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = 3036;  

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

app.post('/iniciodesesion', async (req, res) => {
    console.log(req.body); 
    const { usuario, contraseña } = req.body;  

    try {
        const queryIniciodeSesion = `
            SELECT * FROM usuario WHERE usuario = $1 AND contraseña = $2
        `;
        const resultado1 = await pool.query(queryIniciodeSesion, [usuario, contraseña]);
        if (resultado1.rows.length > 0) {
            res.status(200).send("Inicio de Sesion Correcto, Bienvenido");
        } else {
            res.status(401).send("Inicio de Sesion Incorrecto, Intente Nuevamente");
        }
    } catch (error) {
        console.error(error);  
        res.status(500).send("Error en el servidor, por favor intente más tarde");
    }
});
app.post("/olvidastecontra", async (req, res) => {
    console.log(req.body);
    const { usuario, contraseña } = req.body;
    try {
        const queryUsuario1 = `
            SELECT * FROM usuario WHERE usuario = $1
        `;
        const resultado = await pool.query(queryUsuario1, [usuario]);

        if (resultado.rows.length > 0) {
            const queryUpdate = `
                UPDATE usuario 
                SET contraseña = $2::varchar
                WHERE usuario = $1::varchar
            `;
            const result = await pool.query(queryUpdate, [usuario, contraseña]);
            console.log(result);
            res.status(201).send('Usuario Correcto, Contraseña Actualizada de Forma Segura');
        } else {
            res.status(400).send('Usuario No Encontrado, Verifique Que Sus Datos Sean Correctos');
        }
    } catch (error) {
        console.error('Error al actualizar datos:', error.message);
        res.status(500).send(`Error al registrar el usuario: ${error.message}`);
    }
});
app.post("/informe", async (req, res) => {
    console.log(req.body);
    const {texto} = req.body;
    try {
        const queryInforme = `
        INSERT INTO informe (texto)
        VALUES ($1)
        `;
        const resultado3 = await pool.query(queryInforme, [texto]);
        res.status(200).send("Informe del Paciente Guardado Correctamente");
    } catch (error) {
        console.error("Error al actualizar datos:", error.message);
        res.status(500).send("Error al ingresar el informe del usuario: ${error.message}");
    }
});
app.post("/emociones", async(req,res)=>{
    console.log(req.body);
    const{tipo}=req.body;
    try{
        if(tipo!=="Feliz" || tipo!=="Triste"){
            res.status(400).send("La Emocion No Es Correcta Para El Usuario");
        }
        else{
            const queryEmociones=`
            INSERT INTO emociones (tipo)
            VALUES ($1)
            `;
            const resultado4=await pool.query(queryEmociones,[tipo]);
            res.status(200).send("Emocion Del Usuario Guardada De Manera Correcta");
        }
    }
    catch (error) {
        console.error("Error al ingresar la emocion del usuario:", error.message);
        res.status(500).send("Error al guardar la emocion del usuario: ${error.message}");
    }
})

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const app = express();
const port = 3001;  
const cors = require('cors');
app.use(cors());
const crypto=require("crypto");
const Secret="hola comp estras";

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

        console.log("result len:",resultado.rows.length)
        if (resultado.rows.length > 0) {
            res.status(400).send('El nombre de usuario ya existe. Por favor, elige otro.');
        } else {
            const hashedcontra = await bcrypt.hash(contraseña, 10);
            const queryregistro = `
                INSERT INTO usuario (usuario, nombre, apellido, pregunta, contraseña)
                VALUES ($1, $2, $3, $4, $5)
            `;
            const result = await pool.query(queryregistro, [usuario, nombre, apellido, pregunta, hashedcontra]);
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
                SELECT * FROM usuario WHERE usuario = $1
            `;
            const resultado1 = await pool.query(queryIniciodeSesion, [usuario]);
            if (resultado1.rows.length > 0) {
                const usuario= resultado1.rows[0];
                const contrahashed = usuario.contraseña;
                const contraCorrecta = await bcrypt.compare(contraseña, contrahashed);
            
                if (contraCorrecta) {
                    const token=jwt.sign(
                        {id:usuario.id,usuario:usuario.usuario},
                        Secret,
                        {expiresIn:"1h"}
                    );
                    console.log("token:",token);
                    res.send("Inicio de Sesión Correcto, Bienvenido");                
                } else {
                    res.status(401).send("Inicio de Sesión Incorrecto, Intente Nuevamente");
                }
            }else {
                res.status(401).send("Inicio de Sesión Incorrecto, Intente Nuevamente");
            }
        } catch (error) {
            console.error(error);  
            res.status(500).send("Error en el servidor, por favor intente más tarde");
        }
    });
    
app.post("/olvidastecontra", async (req, res) => {
    console.log(req.body);
    const { usuario, contraseña, pregunta } = req.body;
    try {
        const queryUsuario1 = `
            SELECT * FROM usuario WHERE usuario = $1 AND pregunta=$2
        `;
        const resultado = await pool.query(queryUsuario1, [usuario, pregunta]);
        if (resultado.rows.length > 0) {
            const hashedcontra = await bcrypt.hash(contraseña, 10);
            const queryUpdate = `
                UPDATE usuario 
                SET contraseña = $2::varchar
                WHERE usuario = $1::varchar
            `;
            const result = await pool.query(queryUpdate, [usuario, hashedcontra]);
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
    const { usuario, texto } = req.body; 
    try {
        const queryUsuario = `SELECT * FROM usuario WHERE usuario = $1`;
        const resultado = await pool.query(queryUsuario, [usuario]);

        if (resultado.rows.length > 0) {
            const queryInforme = `
                INSERT INTO informe (usuario, texto)
                VALUES ($1, $2)
            `;
            await pool.query(queryInforme, [usuario, texto]);
            res.status(200).send("Informe del Paciente Guardado Correctamente");
        } else {
            res.status(400).send("Usuario no encontrado, verifique sus datos.");
        }
    } catch (error) {
        console.error("Error al guardar el informe:", error.message);
        res.status(500).send(`Error al guardar el informe del usuario: ${error.message}`);
    }
});

app.post("/emociones", async(req,res)=>{
    console.log(req.body);
    const{tipo}=req.body;
    try{
        if(tipo==="Feliz" || tipo==="Triste"){
            const queryEmociones=`
            INSERT INTO emociones (tipo)
            VALUES ($1)
            `;
            const resultado4=await pool.query(queryEmociones,[tipo]);
            res.status(200).send("Emocion Del Usuario Guardada De Manera Correcta");
        }
        else{
            res.status(400).send("La Emocion No Es Correcta Para El Usuario");
        }
    }
    catch (error) {
        console.error("Error al ingresar la emocion del usuario:", error.message);
        res.status(500).send("Error al guardar la emocion del usuario: ${error.message}");
    }
})

app.get('/cancion/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const querycanciones = 'SELECT * FROM canciones WHERE id = $1';
      const resultado5 = await pool.query(querycanciones, [idBusqueda]);
  
      if (resultado5.rows.length > 0) {
        res.status(200).json(resultado5.rows[0]);
      } else {
        res.status(404).send('Canción no encontrada');
      }
    } catch (error) {
      console.error(`Error al encontrar la canción: ${error.message}`);
      res.status(500).send(`Error al encontrar la canción: ${error.message}`);
    }
  });
  

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

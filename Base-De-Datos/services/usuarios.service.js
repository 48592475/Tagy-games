import { config } from "../db.js";
import pkg from "pg";
import bcrypt from "bcryptjs"; 
const { Client } = pkg; 

const getUsuarioByUsuarios = async (usuario) => {
    const client = new Client(config);
    await client.connect();
    try {
        const { rows } = await client.query(
            "SELECT * FROM usuario WHERE usuario = $1",
            [usuario]
        );
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw error;
    } finally {
        await client.end(); 
    }
};

const createUsuario = async (usuario) => {
    const client = new Client(config); 
    await client.connect();
    try {
        const { rows } = await client.query(
            "INSERT INTO usuario (usuario, nombre, apellido, pregunta, contraseña) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [usuario.usuario, usuario.nombre, usuario.apellido, usuario.pregunta, usuario.contraseña]
        );
        return rows[0];
    } catch (error) {
        throw error;
    } finally {
        await client.end(); 
    }
};

const actualizarContraseña = async (usuario, pregunta, contraseña) => {
    const client = new Client(config);
    await client.connect();
    try {
        const queryUsuario1 = `
            SELECT * FROM usuario WHERE usuario = $1 AND pregunta = $2
        `;
        const resultado = await client.query(queryUsuario1, [usuario, pregunta]);
        if (resultado.rows.length > 0) {
            const hashedcontra = await bcrypt.hash(contraseña, 10);
            const queryUpdate = `
                UPDATE usuario 
                SET contraseña = $2::varchar
                WHERE usuario = $1::varchar
            `;
            await client.query(queryUpdate, [usuario, hashedcontra]);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    } finally {
        await client.end(); 
    }
};

export default { getUsuarioByUsuarios, createUsuario, actualizarContraseña };

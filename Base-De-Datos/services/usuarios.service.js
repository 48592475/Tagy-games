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

const actualizarContraseña = async (usuario, contraseña) => {
    const client = new Client(config);
    await client.connect();
    try {
        const queryUpdate = `
            UPDATE usuario 
            SET contraseña = $2
            WHERE usuario = $1
        `;
        await client.query(queryUpdate, [usuario, contraseña]);
        return true; 
    } catch (error) {
        throw error;
    } finally {
        await client.end();
    }
};

// Nuevo método para obtener usuario por ID
const obtenerUsuarioPorId = async (id) => {
    const client = new Client(config);
    await client.connect();
    try {
        const { rows } = await client.query(
            "SELECT * FROM usuario WHERE id = $1",
            [id]
        );
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw error;
    } finally {
        await client.end();
    }
};

export default { getUsuarioByUsuarios, createUsuario, actualizarContraseña, obtenerUsuarioPorId };

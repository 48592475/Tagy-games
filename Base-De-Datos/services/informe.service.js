import { config } from "../db.js";
import pkg from "pg";
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

const crearInforme = async (usuario, texto) => {
    const client = new Client(config);
    await client.connect();
    const queryInforme = `
        INSERT INTO informe (usuario, texto)
        VALUES ($1, $2)
    `; 
    await client.query(queryInforme, [usuario, texto]);
    await client.end(); 
};

export default { crearInforme, getUsuarioByUsuarios }; 

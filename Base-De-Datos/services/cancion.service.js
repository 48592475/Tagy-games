import { config } from "../db.js";
import pkg from "pg";
const { Client } = pkg;

const obtenerCancionesPorId = async (id) => {
    const client = new Client(config);
    await client.connect();
    try {
        const queryCanciones = 'SELECT * FROM canciones WHERE id = $1';
        const { rows } = await client.query(queryCanciones, [id]);
        return rows; 
    } catch (error) {
        throw error;
    } finally {
        await client.end(); 
    }
};



export default { obtenerCancionesPorId };

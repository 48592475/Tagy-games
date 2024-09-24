import { config } from "../db.js";
import pkg from "pg";
const { Client } = pkg;

const obtenerCancionesPorId = async (id) => {
    const client = new Client(config);
    await client.connect();
    try {
        const queryCanciones = 'SELECT * FROM canciones WHERE id = $1';
        const { rows } = await client.query(queryCanciones, [id]);
        return rows; // Devuelve todas las canciones encontradas
    } catch (error) {
        throw error;
    } finally {
        await client.end(); // Cerrar conexión
    }
};

const seleccionarCancionAleatoria = (canciones) => {
    const randomIndex = Math.floor(Math.random() * canciones.length); // Selecciona un índice aleatorio
    return canciones[randomIndex]; // Devuelve la canción aleatoria
};

export default { obtenerCancionesPorId, seleccionarCancionAleatoria };

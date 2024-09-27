import { config } from "../db.js";
import pkg from "pg";
const { Client } = pkg;

const ultimaEmocion = async () => {
    const client = new Client(config);
    await client.connect();
    try {
      const result = await client.query('SELECT tipo FROM emociones ORDER BY id DESC LIMIT 1');
      return result.rows[0].tipo;
    } catch (error) {
      throw new Error('Error al obtener la última emoción: ' + error.message);
    }
  };

  const cancionAleatoria = async (minId, maxId) => {
    const client = new Client(config);
    await client.connect();
    try {
      const result = await client.query(
        'SELECT * FROM canciones WHERE id BETWEEN $1 AND $2 ORDER BY RANDOM() LIMIT 1',
        [minId, maxId]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Error al obtener una canción aleatoria: ' + error.message);
    }
  };

export default { ultimaEmocion, cancionAleatoria };

import { config } from "../db.js";
import pkg from "pg";
const { Client } = pkg;

const getLastEmocion = async () => {
    const client = new Client(config);
    await client.connect();
    try {
      const result = await client.query('SELECT tipo FROM emociones ORDER BY id DESC LIMIT 1');
      return result.rows[0].tipo;
    } catch (error) {
      throw new Error('Error al obtener la última emoción: ' + error.message);
    }
  };



export default { getLastEmocion };

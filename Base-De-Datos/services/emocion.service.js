import { config } from "../db.js";
import pkg from "pg";
const { Client } = pkg;

const crearEmocion = async (tipo) => {
    const client = new Client(config);
    await client.connect();
    
    const queryEmocion = `
        INSERT INTO emociones (tipo)
        VALUES ($1)
    `; 
    
    try {
        const result = await client.query(queryEmocion, [tipo]);
        return result.rows[0];
    } catch (error) {
        throw error; 
    } finally {
        await client.end(); 
    }
};

export default { crearEmocion };

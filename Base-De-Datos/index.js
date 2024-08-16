import express from "express"; 
import cors from 'cors' 
const app = express() 
const PORT = 8000 
app.use(cors({ origin: '*', credentials: true })); 
//Middlewares 
app.use(cors()); app.use(express.json()); 
//Iniciar el servidor 
app.listen(PORT, () => { console.log(`✅ Server is running on port ${PORT}`); })

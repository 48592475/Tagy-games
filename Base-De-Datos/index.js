import express from "express";
import AuthRouter from "./routes/auth.router.js"; 
import InformeRouter from "./routes/informe.router.js"; 
import CancionRouter from "./routes/cancion.router.js";
import EmocionRouter from "./routes/emocion.router.js"
import cors from "cors";
import "dotenv/config";
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_, res) => res.send("TagyGames API is running..."));
app.use("/auth", AuthRouter); 
app.use("/", InformeRouter);
app.use('/', CancionRouter);
app.use("/", EmocionRouter);
app.get('/alegre', (req, res) => {
  res.send('Ruta alegre');
});
app.get('/relajante', (req, res) => {
  res.send('Ruta relajante');
});
app.listen(process.env.PORT || 3000, () =>
    console.log(`Server is running on port ${process.env.PORT || 3000}`)
);

import express from "express";
import AuthRouter from "./routes/auth.router.js"; 
import InformeRouter from "./routes/informe.router.js"; 
import CancionRouter from "./routes/cancion.router.js"
import cors from "cors";
import "dotenv/config";
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_, res) => res.send("TagyGames API is running..."));
app.use("/auth", AuthRouter); 
app.use("/informe", InformeRouter);
app.use("/cancion",CancionRouter);
app.listen(process.env.PORT || 3000, () =>
    console.log(`Server is running on port ${process.env.PORT || 3000}`)
);

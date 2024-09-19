import express from "express";
import AuthRouter from "./routes/auth.router.js"; // Asegúrate de que el nombre del archivo y la ruta sean correctos
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_, res) => res.send("TagyGames API is running..."));
app.use("/auth", AuthRouter); 

app.listen(process.env.PORT || 9000, () =>
    console.log(`Server is running on port ${process.env.PORT || 9000}`)
);

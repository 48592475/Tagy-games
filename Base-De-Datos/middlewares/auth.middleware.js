import jwt from "jsonwebtoken";
import UsuariosService from "../services/usuarios.service.js";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No autorizado, token faltante o mal formado" });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, "Hola como estas", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido o expirado" });
        }
        req.userId = decoded.id;
        next();
    });
};

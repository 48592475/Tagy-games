import jwt from "jsonwebtoken";
import UsuariosService from "../services/usuarios.service.js";

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No autorizado, token faltante o mal formado" });
        }
        const token = authHeader.split(" ")[1];
        const veryfi = jwt.verify(token, "Hola como estas");
        if (!veryfi.id) {
            return res.status(401).json({ message: "Token inválido, falta el id de usuario" });
        }
        req.userId = veryfi.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};



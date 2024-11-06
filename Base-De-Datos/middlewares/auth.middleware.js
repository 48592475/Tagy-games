import jwt from "jsonwebtoken";
import UsuariosService from "../services/usuarios.service.js";

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No autorizado, token faltante o mal formado" });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, "Hola como estas", async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido o expirado" });
        }

        console.log("Decoded token:", decoded);

        const user = await UsuariosService.obtenerUsuarioPorId(decoded.id); 
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado, verifique sus credenciales." });
        }

        req.userId = decoded.id;
        next();
    });
};
        
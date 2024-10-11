import usuariosService from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registrar = async (req, res) => {
    const user = req.body;
    if (!user) {
        return res.status(400).json({ message: "No hay ningun usuario" });
    }
    if (!user.usuario || !user.nombre || !user.apellido || !user.pregunta || !user.contraseña) {
        return res.status(400).json({ message: "Hay 1 campo o más sin completar" });
    }
    try {
        const usuarioExistente = await usuariosService.getUsuarioByUsuarios(user.usuario);
        if (usuarioExistente) {
            return res.status(400).json({ message: "Ese nombre de usuario ya existe, por favor inserte otro" });
        }
        const hashedContra = await bcrypt.hash(user.contraseña, 10);
        user.contraseña = hashedContra;
        await usuariosService.createUsuario(user);
        return res.status(201).json({ message: "Usuario creado de forma exitosa" });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        return res.status(500).json({ message: error.message });
    }
};
const iniciodesesion = async (req, res) => {
    const { usuario, contraseña } = req.body;
    if (!usuario || !contraseña) {
        return res.status(400).json({ message: "Hay campos sin completar" });
    }
    try {
        const user = await usuariosService.getUsuarioByUsuarios(usuario);
        if (!user) {
            return res.status(400).json({ message: "No hay ningun usuario, por favor verifique sus datos" });
        }
        const contraseñaCorrecta = await bcrypt.compare(contraseña, user.contraseña);
        if (!contraseñaCorrecta) {
            return res.status(400).json({ message: "Contraseña incorrecta, intente nuevamente" });
        }
        const token = jwt.sign({ id: user.id }, "Hola como estas", { expiresIn: "1h" });
        return res.status(200).json({ message: "Inicio de sesión exitoso", user, token });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return res.status(500).json({ message: error.message });
    }
};

const olvidastecontra = async (req, res) => {
    const { usuario, contraseña, pregunta } = req.body;
    if (!usuario || !contraseña || !pregunta) {
        return res.status(400).json({ message: "Hay campos sin completar" });
    }

    try {
        const user = await usuariosService.getUsuarioByUsuarios(usuario);
        if (!user) {
            return res.status(400).json({ message: "No hay ningun usuario, por favor verifique sus datos" });
        }

        if (user.pregunta !== pregunta) {
            return res.status(400).json({ message: "Pregunta de seguridad incorrecta, intente nuevamente" });
        }

        const hashedContra = await bcrypt.hash(contraseña, 10);
        await usuariosService.actualizarContraseña(usuario, hashedContra);

        return res.status(200).json({ message: "Contraseña actualizada de forma correcta" });
    } catch (error) {
        console.error("Error al actualizar la contraseña:", error);
        return res.status(500).json({ message: error.message });
    }
};
export default { registrar, iniciodesesion,olvidastecontra};

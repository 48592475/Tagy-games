import informeService from "../services/informe.service.js"; 

export const guardarInforme = async (req, res) => {
    console.log(req.body);
    const { usuario, texto } = req.body; 
    if (!usuario || !texto) {
        return res.status(400).json({ message: "Hay campos sin completar" });
    }

    try {
        const usuarioExistente = await informeService.getUsuarioByUsuarios(usuario);

        if (usuarioExistente) {
            await informeService.crearInforme(usuario, texto);
            return res.status(200).send({message:"Informe del Paciente Guardado Correctamente"});
        } else {
            return res.status(400).send({message:"Usuario no encontrado, verifique sus datos."});
        }
    } catch (error) {
        console.error("Error al guardar el informe:", error.message);
        return res.status(500).send(`Error al guardar el informe del usuario: ${error.message}`);
    }
};

export default { guardarInforme };

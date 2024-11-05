import informeService from "../services/informe.service.js"; 

export const guardarInforme = async (req, res) => {
    console.log(req.body);
    const { usuario, texto } = req.body; 
    try {
        const usuarioExistente = await informeService.getUsuarioByUsuarios(usuario);
        console.log(usuario, usuarioExistente)
        if (usuarioExistente) {
            await informeService.crearInforme(usuario, texto);
            return res.status(200).send({message:"Informe del Paciente Guardado Correctamente"});
        } else {
            return res.status(400).send({message:"Usuario no encontrado, verifique sus credenciales."});
        }
    } catch (error) {
        console.error("Error al guardar el informe:", error.message);
        return res.status(500).send(`Error al guardar el informe del usuario: ${error.message}`);
    }
};

export const obtenerInforme = async (req, res) => {
    try {
        const informes = await informeService.obtenerInformes();
        return res.status(200).json(informes);
    } catch (error) {
        console.error("Error al obtener los informes:", error.message);
        return res.status(500).send(`Error al obtener los informes: ${error.message}`);
    }
};

export default { guardarInforme, obtenerInforme };

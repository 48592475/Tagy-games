import emocionService from "../services/emocion.service.js"; 

const guardarEmocion = async (req, res) => {
    console.log(req.body);
    const { tipo } = req.body; 
    if (!tipo) {
        return res.status(400).json({ message: "Hay campos sin completar" });
    }
    try {
        await emocionService.crearEmocion(tipo);
        return res.status(200).send({ message: "Emoción guardada" });
    } catch (error) {
        console.error("Error al guardar la emoción:", error.message);
        return res.status(500).send(`Error al guardar la emoción del usuario: ${error.message}`);
    }
};

export default { guardarEmocion };

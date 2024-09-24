import cancionService from "../services/cancion.service.js"; 

const obtenerCancion = async (req, res) => {
    const { id } = req.params;

    try {
        const canciones = await cancionService.obtenerCancionesPorId(id);

        if (canciones.length > 0) {
            const cancionAleatoria = cancionService.seleccionarCancionAleatoria(canciones);
            return res.status(200).json(cancionAleatoria);
        } else {
            return res.status(404).send('Canción no encontrada');
        }
    } catch (error) {
        console.error(`Error al encontrar la canción: ${error.message}`);
        return res.status(500).send(`Error al encontrar la canción: ${error.message}`);
    }
};

export default { obtenerCancion };
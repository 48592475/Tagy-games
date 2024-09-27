import cancionService from "../services/cancion.service.js"; 

const cancionEmocion = async (req, res) => {
  try {
    const ultimaEmocion = await cancionService.ultimaEmocion();
    let cancion;

    if (ultimaEmocion === 'alegre') {
      cancion = await cancionService.cancionAleatoria(1, 7);
      return res.status(200).json({ emocion: 'alegre', cancion });
    } else if (ultimaEmocion === 'relajante') {
      cancion = await cancionService.cancionService(8, 13);
      return res.status(200).json({ emocion: 'relajante', cancion });
    } else {
      return res.status(400).json({ message: 'Emoción no reconocida' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};




export default {cancionEmocion}
import cancionService from "../services/cancion.service.js"; 

const handleEmocion = async (req, res) => {
  try {
    const ultimaEmocion = await cancionService.getLastEmocion();
    
    if (ultimaEmocion === 'alegre') {
      return res.redirect('/alegre');
    } else if (ultimaEmocion === 'relajante') {
      return res.redirect('/relajante');
    } else {
      return res.status(400).json({ message: 'Emoción no reconocida' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};




export default {handleEmocion}
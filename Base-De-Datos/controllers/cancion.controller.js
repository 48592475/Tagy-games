import cancionService from "../services/cancion.service.js"; 

const cancionEmocion = async (req, res) => {
  try {
    const { playRelajante, playAlegre } = req.query; // Leer parámetros desde la consulta
    let cancion;
    console.log(playAlegre,playRelajante)
    if (playRelajante === 'true') {
      cancion = await cancionService.cancionAleatoria(8, 13);
      return res.status(200).json({ emocion: 'relajante', cancion });
    } else if (playAlegre === 'true') {
      cancion = await cancionService.cancionAleatoria(1, 7); 
      return res.status(200).json({ emocion: 'alegre', cancion });
    } else {
      return res.status(400).json({ message: 'Emoción no reconocida' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default { cancionEmocion };

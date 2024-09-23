const router = express.Router();
import express from 'express';
import CancionController from "../controllers/cancion.controller.js";
import cancionController from "../controllers/cancion.controller.js";


router.get('/:id', cancionController.obtenerCancion);

export default router;

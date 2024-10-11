const router = express.Router();
import express from 'express';
import CancionController from "../controllers/cancion.controller.js";
import cancionController from "../controllers/cancion.controller.js";
import {verifyToken } from "../middlewares/auth.middleware.js";


router.get('/cancion', cancionController.cancionEmocion);
export default router;

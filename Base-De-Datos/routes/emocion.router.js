const router = express.Router();
import express from 'express';
import EmocionController from "../controllers/emocion.controller.js";
import emocionController from "../controllers/emocion.controller.js";
import {verifyToken } from "../middlewares/auth.middleware.js";

router.post('/emocion', emocionController.guardarEmocion);
export default router;
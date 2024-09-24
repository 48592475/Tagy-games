const router = express.Router();
import express from 'express';
import InformeController from "../controllers/informe.controller.js";
import informeController from "../controllers/informe.controller.js";
import {verifyToken } from "../middlewares/auth.middleware.js";



router.post("/",verifyToken, informeController.guardarInforme); 

export default router;

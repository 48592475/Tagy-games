const router = express.Router();
import express from 'express';
import InformeController from "../controllers/informe.controller.js";
import informeController from "../controllers/informe.controller.js";


router.post("/", informeController.guardarInforme); 

export default router;


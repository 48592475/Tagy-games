const router = express.Router();
import express from 'express';
import AuthController from "../controllers/auth.controller.js";
import bcrypt from"bcryptjs";
import jwt from "jsonwebtoken";
import authController from "../controllers/auth.controller.js";


router.post("/registrar", authController.registrar); 
router.post("/iniciodesesion", authController.iniciodesesion);
router.post("/olvidastecontra", authController.olvidastecontra);

export default router;


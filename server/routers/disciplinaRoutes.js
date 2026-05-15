import express from "express";
import {
    criarDisciplina,
    listarDisciplinas
} from "../controllers/disciplinaController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, criarDisciplina);
router.get("/", authMiddleware, listarDisciplinas);

export default router;
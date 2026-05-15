import express from "express";
import {
    criarCurso,
    listarCursos
} from "../controllers/cursoController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, criarCurso);
router.get("/", authMiddleware, listarCursos);

export default router;
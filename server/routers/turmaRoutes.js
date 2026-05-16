import express from "express";

import {
  criarTurma,
  listarTurmas
} from "../controllers/turmaController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, criarTurma);
router.get("/", authMiddleware, listarTurmas);

export default router;
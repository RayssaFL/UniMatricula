import express from "express";

import {
  criarMatricula,
  listarMatriculas,
  cancelarMatricula
} from "../controllers/matriculaController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, criarMatricula);
router.get("/", authMiddleware, listarMatriculas);
router.delete("/", authMiddleware, cancelarMatricula);

export default router;
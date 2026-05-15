import express from "express";
import {
    criarMatricula,
    listarMatriculas
} from "../controllers/matriculaController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/", authMiddleware, criarMatricula);


router.get("/", authMiddleware, listarMatriculas);

export default router;
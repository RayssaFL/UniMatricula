import express from "express";
import {
    cadastrarAluno,
    loginAluno
} from "../controllers/alunoController.js";

const router = express.Router();
router.post("/register", cadastrarAluno);
router.post("/login", loginAluno);

export default router;
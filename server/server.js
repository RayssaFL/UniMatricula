import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/database.js";
import authRoutes from "./routers/authRoutes.js";
import alunoRoutes from "./routers/alunoRoutes.js";
import cursoRoutes from "./routers/cursoRoutes.js";
import disciplinaRoutes from "./routers/disciplinaRoutes.js";
import turmaRoutes from "./routers/turmaRoutes.js";
import matriculaRoutes from "./routers/matriculaRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/alunos", alunoRoutes);
app.use("/cursos", cursoRoutes);
app.use("/disciplinas", disciplinaRoutes);
app.use("/turmas", turmaRoutes);
app.use("/matriculas", matriculaRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("API rodando");
});


const startServer = async () => {
    await connectDB();

    
    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000");
    });
};

startServer();
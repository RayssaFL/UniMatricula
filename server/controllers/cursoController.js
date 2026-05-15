import Curso from "../models/Curso.js";

export const criarCurso = async (req, res) => {
    const curso = await Curso.create(req.body);
    res.json({ ok: true, data: curso });
};

export const listarCursos = async (req, res) => {
    const cursos = await Curso.find();
    res.json({ ok: true, data: cursos });
};
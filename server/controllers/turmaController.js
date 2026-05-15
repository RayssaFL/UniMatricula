import Turma from "../models/Turma.js";

export const criarTurma = async (req, res) => {
    const turma = await Turma.create(req.body);
    res.json({ ok: true, data: turma });
};

export const listarTurmas = async (req, res) => {
    const turmas = await Turma.find()
        .populate("disciplina")
        .populate("professor");

    res.json({ ok: true, data: turmas });
};
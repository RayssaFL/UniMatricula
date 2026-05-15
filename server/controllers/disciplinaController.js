import Disciplina from "../models/Disciplina.js";

export const criarDisciplina = async (req, res) => {
    const disc = await Disciplina.create(req.body);
    res.json({ ok: true, data: disc });
};

export const listarDisciplinas = async (req, res) => {
    const disciplinas = await Disciplina.find().populate("curso");
    res.json({ ok: true, data: disciplinas });
};
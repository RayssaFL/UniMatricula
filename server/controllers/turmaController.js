import Turma from "../models/Turma.js";
import Disciplina from "../models/Disciplina.js";
import Professor from "../models/Professor.js";

export const criarTurma = async (req, res) => {
  try {
    const turma = await Turma.create(req.body);
    res.status(201).json({
      ok: true,
      data: turma
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      erro: err.message
    });
  }
};

export const listarTurmas = async (req, res) => {
  try {
    const turmas = await Turma.find()
      .populate("disciplina", "nome quantidadeCreditos cargaHoraria tipo curso")
      .populate("professor", "nome titulacao departamento email");
    res.json({
      ok: true,
      data: turmas
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      erro: err.message
    });
  }
};
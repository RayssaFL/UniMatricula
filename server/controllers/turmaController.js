import Turma from "../models/Turma.js";
import Aluno from "../models/Aluno.js";
import Professor from "../models/Professor.js";

export const criarTurma = async (req, res) => {
  try {
    const turma = await Turma.create(req.body);

    return res.status(201).json({
      ok: true,
      data: turma
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      erro: err.message
    });
  }
};

export const listarTurmas = async (req, res) => {
  try {
    const alunoId = req.user.id;

    const aluno = await Aluno.findById(alunoId);

    if (!aluno) {
      return res.status(404).json({
        ok: false,
        msg: "Aluno não encontrado"
      });
    }

    const turmas = await Turma.find()
      .populate({
        path: "disciplina",
        match: {
          curso: aluno.curso,
          semestre: aluno.semestreAtual
        },
        select:
          "nome quantidadeCreditos cargaHoraria tipo curso semestre preRequisitos",
        populate: {
          path: "preRequisitos",
          select: "nome"
        }
      })
      .populate("professor", "nome titulacao departamento email");

    const turmasFiltradas = turmas.filter(
      (turma) => turma.disciplina !== null
    );

    return res.json({
      ok: true,
      data: turmasFiltradas
    });
  } catch (err) {
    console.log("ERRO AO LISTAR TURMAS:", err);

    return res.status(500).json({
      ok: false,
      msg: "Erro ao listar turmas",
      erro: err.message
    });
  }
};
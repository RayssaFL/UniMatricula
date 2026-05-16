import Matricula from "../models/Matricula.js";
import Turma from "../models/Turma.js";

export const criarMatricula = async (req, res) => {
  try {
    const aluno = req.user.id;
    const { turmas } = req.body;

    if (!aluno) {
      return res.status(401).json({
        ok: false,
        msg: "Aluno não identificado pelo token"
      });
    }

    if (!turmas || !Array.isArray(turmas) || turmas.length === 0) {
      return res.status(400).json({
        ok: false,
        msg: "Selecione pelo menos uma disciplina"
      });
    }

    const matriculaAntiga = await Matricula.findOne({ aluno });

    if (matriculaAntiga) {
      for (const turmaId of matriculaAntiga.turmas) {
        await Turma.findByIdAndUpdate(turmaId, {
          $inc: { vagasOcupadas: -1 }
        });
      }

      await Matricula.deleteOne({ aluno });
    }

    for (const turmaId of turmas) {
      const turma = await Turma.findById(turmaId).populate("disciplina");

      if (!turma) {
        return res.status(404).json({
          ok: false,
          msg: "Turma não encontrada"
        });
      }

      if (turma.vagasOcupadas >= turma.vagasTotais) {
        return res.status(400).json({
          ok: false,
          msg: `Turma de ${turma.disciplina?.nome || "disciplina"} está lotada`
        });
      }
    }

    for (const turmaId of turmas) {
      await Turma.findByIdAndUpdate(turmaId, {
        $inc: { vagasOcupadas: 1 }
      });
    }

    const novaMatricula = await Matricula.create({
      aluno,
      turmas
    });

    return res.status(201).json({
      ok: true,
      msg: "Matrícula efetuada com sucesso",
      data: novaMatricula
    });
  } catch (err) {
    console.log("ERRO AO CRIAR MATRÍCULA:", err);

    return res.status(500).json({
      ok: false,
      msg: "Erro ao realizar matrícula",
      erro: err.message
    });
  }
};

export const listarMatriculas = async (req, res) => {
  try {
    const aluno = req.user.id;

    const matricula = await Matricula.findOne({ aluno }).populate({
      path: "turmas",
      populate: [
        {
          path: "disciplina",
          select: "nome tipo quantidadeCreditos cargaHoraria curso"
        },
        {
          path: "professor",
          select: "nome titulacao departamento email"
        }
      ]
    });

    return res.json({
      ok: true,
      data: matricula
    });
  } catch (err) {
    console.log("ERRO AO LISTAR MATRÍCULA:", err);

    return res.status(500).json({
      ok: false,
      msg: "Erro ao buscar matrícula",
      erro: err.message
    });
  }
};

export const cancelarMatricula = async (req, res) => {
  try {
    const aluno = req.user.id;

    if (!aluno) {
      return res.status(401).json({
        ok: false,
        msg: "Aluno não identificado pelo token"
      });
    }

    const matricula = await Matricula.findOne({ aluno });

    if (!matricula) {
      return res.status(404).json({
        ok: false,
        msg: "Matrícula não encontrada"
      });
    }

    for (const turmaId of matricula.turmas) {
      await Turma.findByIdAndUpdate(turmaId, {
        $inc: { vagasOcupadas: -1 }
      });
    }

    await Matricula.deleteOne({ aluno });

    return res.json({
      ok: true,
      msg: "Matrícula cancelada com sucesso"
    });
  } catch (err) {
    console.log("ERRO AO CANCELAR MATRÍCULA:", err);

    return res.status(500).json({
      ok: false,
      msg: "Erro ao cancelar matrícula",
      erro: err.message
    });
  }
};
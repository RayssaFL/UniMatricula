import Matricula from "../models/Matricula.js";
import Turma from "../models/Turma.js";
import Aluno from "../models/Aluno.js";

export const criarMatricula = async (req, res) => {
  try {
    const alunoId = req.user.id;
    const { turmas } = req.body;

    if (!alunoId) {
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

    const aluno = await Aluno.findById(alunoId);

    if (!aluno) {
      return res.status(404).json({
        ok: false,
        msg: "Aluno não encontrado"
      });
    }

    const disciplinasConcluidas = aluno.disciplinasConcluidas.map((id) =>
      String(id)
    );

    for (const turmaId of turmas) {
      const turma = await Turma.findById(turmaId).populate({
        path: "disciplina",
        populate: {
          path: "preRequisitos",
          select: "nome"
        }
      });

      if (!turma) {
        return res.status(404).json({
          ok: false,
          msg: "Turma não encontrada"
        });
      }

      if (!turma.disciplina) {
        return res.status(404).json({
          ok: false,
          msg: "Disciplina da turma não encontrada"
        });
      }

      if (String(turma.disciplina.curso) !== String(aluno.curso)) {
        return res.status(403).json({
          ok: false,
          msg: `A disciplina ${turma.disciplina.nome} não pertence ao seu curso`
        });
      }

      if (turma.disciplina.semestre !== aluno.semestreAtual) {
        return res.status(403).json({
          ok: false,
          msg: `A disciplina ${turma.disciplina.nome} não pertence ao seu semestre atual`
        });
      }

      for (const preReq of turma.disciplina.preRequisitos) {
        if (!disciplinasConcluidas.includes(String(preReq._id))) {
          return res.status(400).json({
            ok: false,
            msg: `Você não possui o pré-requisito ${preReq.nome} para cursar ${turma.disciplina.nome}`
          });
        }
      }

      if (turma.vagasOcupadas >= turma.vagasTotais) {
        return res.status(400).json({
          ok: false,
          msg: `Turma de ${turma.disciplina.nome} está lotada`
        });
      }
    }

    const matriculaAntiga = await Matricula.findOne({ aluno: alunoId });

    if (matriculaAntiga) {
      for (const turmaId of matriculaAntiga.turmas) {
        await Turma.findByIdAndUpdate(turmaId, {
          $inc: { vagasOcupadas: -1 }
        });
      }

      await Matricula.deleteOne({ aluno: alunoId });
    }

    for (const turmaId of turmas) {
      await Turma.findByIdAndUpdate(turmaId, {
        $inc: { vagasOcupadas: 1 }
      });
    }

    const novaMatricula = await Matricula.create({
      aluno: alunoId,
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
          select:
            "nome tipo quantidadeCreditos cargaHoraria curso semestre preRequisitos",
          populate: {
            path: "preRequisitos",
            select: "nome"
          }
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
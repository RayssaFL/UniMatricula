import Matricula from "../models/Matricula.js";
import Turma from "../models/Turma.js";

export const criarMatricula = async (req, res) => {
    try {
        const { aluno, turmas } = req.body;

        for (let turmaId of turmas) {
            const turma = await Turma.findById(turmaId);

            if (turma.vagasOcupadas >= turma.vagasTotais) {
                return res.status(400).json({
                    ok: false,
                    msg: "Turma lotada"
                });
            }
        }

        for (let turmaId of turmas) {
            await Turma.findByIdAndUpdate(turmaId, {
                $inc: { vagasOcupadas: 1 }
            });
        }

        const matricula = await Matricula.create({
            aluno,
            turmas
        });

        res.json({ ok: true, data: matricula });

    } catch {
        res.status(500).json({ ok: false });
    }
};


export const listarMatriculas = async (req, res) => {
    const matriculas = await Matricula.find({ aluno: req.user.id })
        .populate({
            path: "turmas",
            populate: { path: "disciplina" }
        });

    res.json({ ok: true, data: matriculas });
};
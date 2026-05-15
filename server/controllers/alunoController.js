import Aluno from "../models/Aluno.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const cadastrarAluno = async (req, res) => {
    try {
        const { nome, matricula, senha, cpf, email } = req.body;

        if (!nome || !matricula || !senha) {
            return res.status(400).json({ ok: false, msg: "Campos obrigatórios" });
        }

        const existe = await Aluno.findOne({ matricula });

        if (existe) {
            return res.status(400).json({ ok: false, msg: "Matrícula já existe" });
        }

        const hash = await bcrypt.hash(senha, 10);

        const aluno = await Aluno.create({
            nome,
            matricula,
            senha: hash,
            cpf,
            email
        });

        res.status(201).json({ ok: true, data: aluno });

    } catch {
        res.status(500).json({ ok: false });
    }
};

export const loginAluno = async (req, res) => {
    try {
        const { matricula, senha } = req.body;

        const aluno = await Aluno.findOne({ matricula });

        if (!aluno) return res.status(401).json({ ok: false });

        const ok = await bcrypt.compare(senha, aluno.senha);

        if (!ok) return res.status(401).json({ ok: false });

        const token = jwt.sign({ id: aluno._id }, process.env.JWT_SECRET);

        res.json({
            ok: true,
            token,
            aluno: {
                nome: aluno.nome,
                matricula: aluno.matricula
            }
        });

    } catch {
        res.status(500).json({ ok: false });
    }
};
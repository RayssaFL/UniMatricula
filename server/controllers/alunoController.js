import Aluno from "../models/Aluno.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const cadastrarAluno = async (req, res) => {
  try {
    const {
      nome,
      matricula,
      senha,
      cpf,
      email,
      telefone,
      dataNascimento,
      statusFinanceiro,
      curso,
      semestreAtual,
      disciplinasConcluidas,
      status
    } = req.body;
    if (!nome || !matricula || !senha) {
      return res.status(400).json({
        ok: false,
        msg: "Nome, matrícula e senha são obrigatórios"
      });
    }
    if (!curso) {
      return res.status(400).json({
        ok: false,
        msg: "Curso é obrigatório"
      });
    }
    if (!semestreAtual) {
      return res.status(400).json({
        ok: false,
        msg: "Semestre atual é obrigatório"
      });
    }
    const existe = await Aluno.findOne({ matricula });
    if (existe) {
      return res.status(400).json({
        ok: false,
        msg: "Matrícula já existe"
      });
    }
    const hash = await bcrypt.hash(senha, 10);
    const aluno = await Aluno.create({
      nome,
      matricula,
      senha: hash,
      cpf,
      email,
      telefone,
      dataNascimento,
      statusFinanceiro,
      curso,
      semestreAtual,
      disciplinasConcluidas: disciplinasConcluidas || [],
      status
    });
    return res.status(201).json({
      ok: true,
      msg: "Aluno cadastrado com sucesso",
      aluno: {
        id: aluno._id,
        nome: aluno.nome,
        matricula: aluno.matricula,
        cpf: aluno.cpf,
        email: aluno.email,
        telefone: aluno.telefone,
        dataNascimento: aluno.dataNascimento,
        statusFinanceiro: aluno.statusFinanceiro,
        curso: aluno.curso,
        semestreAtual: aluno.semestreAtual,
        disciplinasConcluidas: aluno.disciplinasConcluidas,
        status: aluno.status
      }
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Erro ao cadastrar aluno",
      erro: err.message
    });
  }
};
export const loginAluno = async (req, res) => {
  try {
    const { matricula, senha } = req.body;
    if (!matricula || !senha) {
      return res.status(400).json({
        ok: false,
        msg: "Matrícula e senha são obrigatórias"
      });
    }
    const aluno = await Aluno.findOne({ matricula });
    if (!aluno) {
      return res.status(401).json({
        ok: false,
        msg: "Matrícula ou senha inválida"
      });
    }
    const senhaCorreta = await bcrypt.compare(senha, aluno.senha);
    if (!senhaCorreta) {
      return res.status(401).json({
        ok: false,
        msg: "Matrícula ou senha inválida"
      });
    }
    const token = jwt.sign(
      { id: aluno._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      ok: true,
      msg: "Login realizado com sucesso",
      token,
      aluno: {
        id: aluno._id,
        nome: aluno.nome,
        matricula: aluno.matricula,
        cpf: aluno.cpf,
        email: aluno.email,
        telefone: aluno.telefone,
        dataNascimento: aluno.dataNascimento,
        statusFinanceiro: aluno.statusFinanceiro,
        curso: aluno.curso,
        semestreAtual: aluno.semestreAtual,
        disciplinasConcluidas: aluno.disciplinasConcluidas,
        status: aluno.status
      }
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Erro ao fazer login",
      erro: err.message
    });
  }
};
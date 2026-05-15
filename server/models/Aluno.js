import mongoose from "mongoose";

const AlunoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  matricula: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  cpf: { type: String, unique: true },
  email: String,
  telefone: String,
  dataNascimento: Date,
  statusFinanceiro: {
    type: String,
    enum: ["Pendente", "Ok"],
    default: "Pendente"
  },
  curso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Curso"
  },
  semestreAtual: Number,
  status: {
    type: String,
    default: "Ativo"
  }
});

export default mongoose.model("Aluno", AlunoSchema);
import mongoose from "mongoose";

const AlunoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, unique: true },
  email: String,
  telefone: String,
  dataNascimento: Date,
  statusFinanceiro: {
    type: String,
    enum: ["Pendente", "Ok"]
  },
  curso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Curso"
  },
  semestreAtual: Number,
  status: String
});

export default mongoose.model("Aluno", AlunoSchema);
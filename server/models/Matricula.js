import mongoose from "mongoose";

const MatriculaSchema = new mongoose.Schema({
  aluno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Aluno",
    required: true
  },
  turmas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Turma"
    }
  ],
  dataEfetivacao: {
    type: Date,
    default: Date.now
  },
  periodoLetivo: Number,
  status: {
    type: String,
    enum: ["Ativa", "Trancada", "Concluída", "Cancelada"],
    default: "Ativa"
  }
});

export default mongoose.model("Matricula", MatriculaSchema);
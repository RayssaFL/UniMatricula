import mongoose from "mongoose";

const TurmaSchema = new mongoose.Schema({
  disciplina: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Disciplina",
    required: true
  },
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professor",
    required: true
  },
  sala: String,
  dia: {
    type: String,
    required: true,
    enum: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
  },
  turno: {
    type: String,
    required: true,
    enum: ["Manhã", "Tarde", "Noite"]
  },
  horario: {
    type: String,
    required: true,
    enum: ["AB", "CD", "EF"]
  },
  vagasTotais: {
    type: Number,
    required: true
  },
  vagasOcupadas: {
    type: Number,
    default: 0
  },
  semestre: Number,
  ano: Number
});

export default mongoose.model("Turma", TurmaSchema);
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
  horario: {
    type: String,
    required: true
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
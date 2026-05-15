import mongoose from "mongoose";

const CursoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  turno: {
    type: String,
    enum: ["Matutino", "Vespertino", "Noturno"]
  },
  modalidade: {
    type: String,
    enum: ["Presencial", "EAD"]
  },
  grau: String,
  cargaHoraria: Number,
  duracaoSemestres: Number
});

export default mongoose.model("Curso", CursoSchema);
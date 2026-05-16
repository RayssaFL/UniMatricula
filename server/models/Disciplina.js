import mongoose from "mongoose";

const DisciplinaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },

  quantidadeCreditos: {
    type: Number,
    required: true
  },

  cargaHoraria: {
    type: Number,
    required: true
  },

  tipo: {
    type: String,
    enum: ["Obrigatória", "Optativa"],
    required: true
  },

  curso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Curso",
    required: true
  },

  semestre: {
    type: Number,
    required: true
  },

  preRequisitos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Disciplina"
    }
  ]
});

export default mongoose.model("Disciplina", DisciplinaSchema);
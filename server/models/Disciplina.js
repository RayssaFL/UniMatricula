import mongoose from "mongoose";

const DisciplinaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  quantidadeCreditos: Number,
  cargaHoraria: Number,
  curso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Curso"
  }
});

export default mongoose.model("Disciplina", DisciplinaSchema);
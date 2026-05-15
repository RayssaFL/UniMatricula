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
      ref: "Turma",
      required: true
    }
  ]
}, { timestamps: true });

export default mongoose.model("Matricula", MatriculaSchema);
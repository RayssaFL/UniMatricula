import mongoose from "mongoose";

const ProfessorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  titulacao: String,
  departamento: String,
  email: String
});

export default mongoose.model("Professor", ProfessorSchema);
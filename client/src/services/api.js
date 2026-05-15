import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN ENVIADO:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const login = (dados) => {
  return api.post("/alunos/login", dados);
};

export const getTurmas = async () => {
  const res = await api.get("/turmas");
  return res.data.data;
};

export const criarMatricula = async (turmas) => {
  const res = await api.post("/matriculas", { turmas });
  return res.data;
};

export const getMinhaMatricula = async () => {
  const res = await api.get("/matriculas");
  return res.data.data;
};

export const verificarToken = async () => {
  const res = await api.get("/auth/verify");
  return res.data;
};
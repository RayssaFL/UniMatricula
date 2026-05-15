import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000"
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

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

export const criarMatricula = async (alunoId, turmas) => {
    const res = await api.post("/matriculas", {
        aluno: alunoId,
        turmas
    });

    return res.data;
};
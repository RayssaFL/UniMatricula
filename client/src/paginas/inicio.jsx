import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './inicio.css';
import logo from '../assets/novologin.png';
import fundo from '../assets/fundo2.png';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Button from "react-bootstrap/Button";
import { login } from "../services/api";

function Inicio() {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [erros, setErros] = useState({});

    const navigate = useNavigate();

    function validar() {
        let novosErros = {};

        if (!matricula) {
            novosErros.matricula = "Matrícula é obrigatória";
        } else if (!/^\d+$/.test(matricula)) {
            novosErros.matricula = "Matrícula deve conter apenas números";
        } else if (matricula.length < 7) {
            novosErros.matricula = "Matrícula deve ter no mínimo 7 dígitos";
        }

        if (!senha) {
            novosErros.senha = "Senha é obrigatória";
        } else if (!/^\d+$/.test(senha)) {
            novosErros.senha = "Senha deve conter apenas números";
        } else if (senha.length < 8) {
            novosErros.senha = "Senha deve ter no mínimo 8 dígitos";
        }

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    }

    async function Ler(e) {
        e.preventDefault();

        if (!validar()) return;

        setCarregando(true);
        setErros({});

        try {
            const response = await login({
                matricula,
                senha
            });

            const { token, aluno } = response.data;

            if (!token || !aluno) {
                setErros({ geral: "Resposta inválida do servidor" });
                return;
            }

            localStorage.setItem("token", token);
            localStorage.setItem("aluno", JSON.stringify(aluno));

            navigate("/dashboard", { replace: true });

        } catch (erro) {
            setErros({
                geral: erro?.response?.data?.msg || "Erro ao fazer login"
            });
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className='fundo' style={{ backgroundImage: `url(${fundo})` }}>
            <div className='todo'>
                <img src={logo} alt="" className='imagem' />
                <br />
                <div className='titulos'>
                    <h1>Acesso ao Unifor online</h1>
                    <h2>Aqui você encontra os serviços digitais da Universidade de Fortaleza.</h2>
                </div>

                <form onSubmit={Ler} className="container">

                    <Form.Group className="mb-3">
                        <Form.Label >Matrícula</Form.Label>
                        <Form.Control
                            type="text"
                            value={matricula}
                            onChange={(e) => {
                                const valor = e.target.value.replace(/\D/g, "");
                                setMatricula(valor);
                            }}
                            className={`input-borda ${erros.matricula ? "is-invalid" : ""}`}
                        />
                        {erros.matricula && (
                            <div className="invalid-feedback">
                                {erros.matricula}
                            </div>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label >Senha</Form.Label>
                        <Form.Control
                            type="password"
                            value={senha}
                            onChange={(e) => {
                                const valor = e.target.value.replace(/\D/g, "");
                                setSenha(valor);
                            }}
                            className={`input-borda ${erros.senha ? "is-invalid" : ""}`}
                        />
                        {erros.senha && (
                            <div className="invalid-feedback">
                                {erros.senha}
                            </div>
                        )}
                        <br />
                        <p className="questao"><a href="#">Esqueceu a senha?</a></p>

                        {erros.geral && (
                            <div className="alert alert-danger">
                                {erros.geral}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={carregando}
                            className="btn btn-primary w-100"
                        >
                            {carregando
                                ? <Spinner animation="border" size="sm" />
                                : "Acessar"
                            }
                        </Button>

                        <p className="volta">
                            <a href="https://unifor.br/">Retornar para o portal Unifor</a>
                        </p>

                    </Form.Group>
                </form>
            </div>
        </div>
    );
}

export default Inicio;
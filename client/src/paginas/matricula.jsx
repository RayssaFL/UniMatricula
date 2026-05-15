import { useState, useEffect } from "react";
import Navbar from "../Componentes/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { getTurmas, criarMatricula } from "../services/api";
import "./matricula.css";

function Matricula() {
  const [busca, setBusca] = useState("");
  const [disciplinas, setDisciplinas] = useState([]);
  const [selecionadas, setSelecionadas] = useState([]);

  const navigate = useNavigate();

  let aluno = null;

  try {
    const alunoStorage = localStorage.getItem("aluno");

    if (alunoStorage && alunoStorage !== "undefined") {
      aluno = JSON.parse(alunoStorage);
    }
  } catch (err) {
    console.log("Erro ao ler aluno:", err);
    localStorage.removeItem("aluno");
  }

  const alunoId = aluno?.id;


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, []);


  useEffect(() => {
    async function load() {
      try {
        const data = await getTurmas();
        setDisciplinas(data);
      } catch (err) {
        console.log("Erro ao carregar turmas:", err);
      }
    }

    load();
  }, []);

  const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  function toggleMateria(turma) {
    const existe = selecionadas.find((m) => m._id === turma._id);

    if (existe) {
      setSelecionadas(selecionadas.filter((m) => m._id !== turma._id));
      return;
    }

    const conflito = selecionadas.find(
      (m) =>
        m.dia === turma.dia &&
        m.horario === turma.horario &&
        m.turno === turma.turno
    );

    if (conflito) {
      alert("Já existe matéria nesse horário!");
      return;
    }

    if (turma.vagasOcupadas >= turma.vagasTotais) {
      alert("Turma lotada!");
      return;
    }

    setSelecionadas([...selecionadas, turma]);
  }

  function getTurma(dia, horario, turno) {
    return disciplinas.find(
      (d) =>
        d.dia === dia &&
        d.horario === horario &&
        d.turno === turno
    );
  }

  function isSelected(dia, horario, turno) {
    return selecionadas.some(
      (m) =>
        m.dia === dia &&
        m.horario === horario &&
        m.turno === turno
    );
  }

  function renderCell(dia, horario, turno) {
    const turma = getTurma(dia, horario, turno);
    const selected = isSelected(dia, horario, turno);

    return (
      <td
        key={`${dia}-${horario}-${turno}`}
        onClick={() => turma && toggleMateria(turma)}
        style={{
          cursor: turma ? "pointer" : "default",
          backgroundColor: selected ? "#0d6efd" : "",
          color: selected ? "white" : "",
          opacity:
            turma && turma.vagasOcupadas >= turma.vagasTotais ? 0.5 : 1,
        }}
      >
        {turma ? turma.disciplina.nome : ""}
      </td>
    );
  }


  async function salvar() {
    try {
      if (!alunoId) {
        alert("Erro: aluno não identificado");
        return;
      }

      if (selecionadas.length === 0) {
        alert("Selecione pelo menos uma disciplina");
        return;
      }

      const ids = selecionadas.map((t) => t._id);

      const res = await criarMatricula(alunoId, ids);

      alert(res.msg || "Matrícula realizada com sucesso");

      localStorage.setItem(
        "disciplinasMatriculadas",
        JSON.stringify(selecionadas)
      );

      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert("Erro ao salvar matrícula");
    }
  }

  if (!aluno) return null;

  return (
    <>
      <Navbar />

      <h1>Matrícula</h1>

      <Container className="mt-4">
        <Row className="g-3">
          <Col md={6}>
            <Form.Control value={aluno.nome || ""} readOnly />
          </Col>

          <Col md={6}>
            <Form.Control
              placeholder="Buscar disciplina"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </Col>
        </Row>
      </Container>

      <h2 className="mt-4">Manhã</h2>
      <Table striped bordered hover responsive className="text-center">
        <thead>
          <tr>
            <th>Horário</th>
            {dias.map((d) => (
              <th key={d}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {["A", "B", "C", "D", "E", "F"].map((h) => (
            <tr key={h}>
              <td>{h}</td>
              {dias.map((d) => renderCell(d, h, "Manhã"))}
            </tr>
          ))}
        </tbody>
      </Table>

      <h2 className="mt-4">Tarde</h2>
      <Table striped bordered hover responsive className="text-center">
        <tbody>
          {["A", "B", "C", "D", "E", "F"].map((h) => (
            <tr key={h}>
              <td>{h}</td>
              {dias.map((d) => renderCell(d, h, "Tarde"))}
            </tr>
          ))}
        </tbody>
      </Table>

      <h2 className="mt-4">Noite</h2>
      <Table striped bordered hover responsive className="text-center">
        <tbody>
          {["A", "B", "C", "D"].map((h) => (
            <tr key={h}>
              <td>{h}</td>
              {dias.map((d) => renderCell(d, h, "Noite"))}
            </tr>
          ))}
        </tbody>
      </Table>

      <Button onClick={salvar} className="mt-4">
        Confirmar Matrícula
      </Button>

      <footer className="mt-4">
        <p>Fundação Edson Queiroz © 2026. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}

export default Matricula;
import { useState, useEffect } from "react";
import Navbar from "../Componentes/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import {
  getTurmas,
  criarMatricula,
  atualizarMatricula,
  cancelarMatricula,
  getMinhaMatricula,
  verificarToken
} from "../services/api";
import "./matricula.css";

function Matricula() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [selecionadas, setSelecionadas] = useState([]);
  const [temMatricula, setTemMatricula] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [celulaSelecionada, setCelulaSelecionada] = useState(null);

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

  useEffect(() => {
    async function validar() {
      try {
        await verificarToken();
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("aluno");
        navigate("/");
      }
    }

    validar();
  }, [navigate]);

  useEffect(() => {
    async function load() {
      try {
        const turmas = await getTurmas();
        const matriculaAtual = await getMinhaMatricula();

        setDisciplinas(turmas);

        if (matriculaAtual?.turmas && matriculaAtual.turmas.length > 0) {
          setSelecionadas(matriculaAtual.turmas);
          setTemMatricula(true);
        } else {
          setSelecionadas([]);
          setTemMatricula(false);
        }
      } catch (err) {
        console.log("Erro ao carregar dados:", err);
      }
    }

    load();
  }, []);

  const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  const horariosManha = ["A", "B", "C", "D", "E", "F"];
  const horariosTarde = ["A", "B", "C", "D", "E", "F"];
  const horariosNoite = ["A", "B", "C", "D"];

  function getNomeDisciplina(turma) {
    return turma?.disciplina?.nome || "Disciplina sem nome";
  }

  function getNomeProfessor(turma) {
    return turma?.professor?.nome || "Professor não informado";
  }

  function getTipoDisciplina(turma) {
    return turma?.disciplina?.tipo || "Tipo não informado";
  }

  function getVagasInfo(turma) {
    const vagasTotais = turma?.vagasTotais || 0;
    const vagasOcupadas = turma?.vagasOcupadas || 0;
    const restantes = vagasTotais - vagasOcupadas;

    return {
      restantes,
      texto: `Vagas: ${vagasOcupadas}/${vagasTotais} (Restam ${restantes})`,
      cor: restantes > 0 ? "green" : "red"
    };
  }

  function horarioContemCelula(horarioTurma, celula) {
    return horarioTurma?.includes(celula);
  }

  function existeConflitoHorario(turmaNova) {
    return selecionadas.find(
      (turmaSelecionada) =>
        turmaSelecionada._id !== turmaNova._id &&
        turmaSelecionada.dia === turmaNova.dia &&
        turmaSelecionada.turno === turmaNova.turno &&
        [...turmaSelecionada.horario].some((letra) =>
          turmaNova.horario.includes(letra)
        )
    );
  }

  function toggleMateria(turma) {
    if (turma.vagasOcupadas >= turma.vagasTotais) return;

    const jaSelecionada = selecionadas.find((m) => m._id === turma._id);

    if (jaSelecionada) {
      setSelecionadas(selecionadas.filter((m) => m._id !== turma._id));
      return;
    }

    const nomeNova = getNomeDisciplina(turma);

    const disciplinaRepetida = selecionadas.find(
      (m) => getNomeDisciplina(m) === nomeNova
    );

    if (disciplinaRepetida) {
      alert("Essa disciplina já foi selecionada em outra turma.");
      return;
    }

    const conflitoHorario = existeConflitoHorario(turma);

    if (conflitoHorario) {
      alert("Já existe matéria nesse horário!");
      return;
    }

    setSelecionadas([...selecionadas, turma]);
  }

  function getTurmaSelecionada(dia, celula, turno) {
    return selecionadas.find(
      (turma) =>
        turma.dia === dia &&
        turma.turno === turno &&
        horarioContemCelula(turma.horario, celula)
    );
  }

  function abrirModalCelula(dia, celula, turno) {
    setCelulaSelecionada({ dia, celula, turno });
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setCelulaSelecionada(null);
  }

  function getTurmasDaCelula() {
    if (!celulaSelecionada) return [];

    return disciplinas.filter(
      (turma) =>
        turma.dia === celulaSelecionada.dia &&
        turma.turno === celulaSelecionada.turno &&
        horarioContemCelula(turma.horario, celulaSelecionada.celula)
    );
  }

  function selecionarTurmaDaCelula(turma) {
    toggleMateria(turma);
    fecharModal();
  }

  function renderCell(dia, celula, turno) {
    const turma = getTurmaSelecionada(dia, celula, turno);

    return (
      <td
        key={`${dia}-${celula}-${turno}`}
        onClick={() => abrirModalCelula(dia, celula, turno)}
        className={turma ? "celula-selecionada celula-click" : "celula-click"}
      >
        {turma ? (
          <>
            <strong>{getNomeDisciplina(turma)}</strong>

            <div style={{ fontSize: "10px" }}>
              {turma.vagasTotais - turma.vagasOcupadas} vagas
            </div>

            <div style={{ fontSize: "12px" }}>✔ Selecionada</div>
          </>
        ) : (
          <span className="celula-vazia">Clique para selecionar</span>
        )}
      </td>
    );
  }

  async function salvar() {
    try {
      if (selecionadas.length === 0) {
        alert("Selecione pelo menos uma disciplina");
        return;
      }

      const ids = selecionadas.map((t) => t._id);

      if (temMatricula) {
        await atualizarMatricula(ids);
        alert("Matrícula atualizada com sucesso");
      } else {
        await criarMatricula(ids);
        alert("Matrícula efetuada com sucesso");
      }

      setTemMatricula(true);
      navigate("/dashboard");
    } catch (err) {
      console.log("ERRO COMPLETO:", err.response?.data);
      alert(err?.response?.data?.msg || "Erro ao salvar matrícula");
    }
  }

  async function handleCancelarMatricula() {
    const confirmar = window.confirm(
      "Tem certeza que deseja cancelar sua matrícula?"
    );

    if (!confirmar) return;

    try {
      await cancelarMatricula();

      alert("Matrícula cancelada com sucesso");

      setSelecionadas([]);
      setTemMatricula(false);
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.msg || "Erro ao cancelar matrícula");
    }
  }

  if (!aluno) return null;

  return (
    <>
      <Navbar />

      <h1>Matrícula</h1>

      <Container className="mt-4">
        <Row className="g-3">
          <Col md={12}>
            <input
              id="nomeAluno"
              name="nomeAluno"
              className="form-control"
              value={aluno.nome || ""}
              readOnly
            />
          </Col>
        </Row>

        <p className="mt-3">
          Disciplinas selecionadas: <strong>{selecionadas.length}</strong>
        </p>
      </Container>

      <h2 className="mt-4">Manhã</h2>

      <Table striped bordered hover responsive className="text-center tabela-matricula">
        <thead>
          <tr>
            <th>Horário</th>
            {dias.map((d) => (
              <th key={d}>{d}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {horariosManha.map((h) => (
            <tr key={h}>
              <td>{h}</td>
              {dias.map((d) => renderCell(d, h, "Manhã"))}
            </tr>
          ))}
        </tbody>
      </Table>

      <h2 className="mt-4">Tarde</h2>

      <Table striped bordered hover responsive className="text-center tabela-matricula">
        <thead>
          <tr>
            <th>Horário</th>
            {dias.map((d) => (
              <th key={d}>{d}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {horariosTarde.map((h) => (
            <tr key={h}>
              <td>{h}</td>
              {dias.map((d) => renderCell(d, h, "Tarde"))}
            </tr>
          ))}
        </tbody>
      </Table>

      <h2 className="mt-4">Noite</h2>

      <Table striped bordered hover responsive className="text-center tabela-matricula">
        <thead>
          <tr>
            <th>Horário</th>
            {dias.map((d) => (
              <th key={d}>{d}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {horariosNoite.map((h) => (
            <tr key={h}>
              <td>{h}</td>
              {dias.map((d) => renderCell(d, h, "Noite"))}
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={modalAberto} onHide={fecharModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Disciplinas disponíveis</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {celulaSelecionada && (
            <p>
              <strong>{celulaSelecionada.dia}</strong> - Horário{" "}
              <strong>{celulaSelecionada.celula}</strong> (
              {celulaSelecionada.turno})
            </p>
          )}

          {getTurmasDaCelula().length === 0 ? (
            <p>Nenhuma disciplina disponível neste horário.</p>
          ) : (
            getTurmasDaCelula().map((turma) => {
              const selecionada = selecionadas.some((t) => t._id === turma._id);
              const vagas = getVagasInfo(turma);
              const lotada = turma.vagasOcupadas >= turma.vagasTotais;

              return (
                <div
                  key={turma._id}
                  className="item-disciplina"
                  onClick={() => !lotada && selecionarTurmaDaCelula(turma)}
                  style={{
                    cursor: lotada ? "not-allowed" : "pointer",
                    backgroundColor: selecionada ? "#198754" : "#fff",
                    color: selecionada ? "#fff" : "#000",
                    opacity: lotada ? 0.5 : 1
                  }}
                >
                  <strong>{getNomeDisciplina(turma)}</strong>
                  <br />

                  <small>Tipo: {getTipoDisciplina(turma)}</small>
                  <br />

                  {turma.disciplina?.semestre && (
                    <>
                      <small>Semestre: {turma.disciplina.semestre}º</small>
                      <br />
                    </>
                  )}

                  {turma.disciplina?.preRequisitos?.length > 0 && (
                    <>
                      <small>
                        Pré-requisitos:{" "}
                        {turma.disciplina.preRequisitos
                          .map((pre) => pre.nome)
                          .join(", ")}
                      </small>
                      <br />
                    </>
                  )}

                  <small>Professor: {getNomeProfessor(turma)}</small>
                  <br />

                  <small>Sala: {turma.sala || "Sala não informada"}</small>
                  <br />

                  <small>
                    {turma.dia} - {turma.horario} ({turma.turno})
                  </small>
                  <br />

                  <small style={{ color: selecionada ? "#fff" : vagas.cor }}>
                    {vagas.texto}
                  </small>

                  {lotada && (
                    <div style={{ fontSize: "12px", color: "red" }}>
                      Turma lotada
                    </div>
                  )}

                  {selecionada && (
                    <div style={{ fontSize: "12px" }}>
                      ✔ Selecionada — clique para remover
                    </div>
                  )}
                </div>
              );
            })
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={fecharModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="mt-4 d-flex gap-2 justify-content-center">
        <Button onClick={salvar} variant="primary">
          {temMatricula ? "Atualizar Matrícula" : "Confirmar Matrícula"}
        </Button>

        {temMatricula && (
          <Button onClick={handleCancelarMatricula} variant="danger">
            Cancelar Matrícula
          </Button>
        )}
      </div>

      <footer className="mt-4">
        <p>Fundação Edson Queiroz © 2026. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}

export default Matricula;
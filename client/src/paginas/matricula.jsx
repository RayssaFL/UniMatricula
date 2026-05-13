import { useState } from "react";
import Navbar from "../Componentes/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import './matricula.css'

function Matricula() {
  const [busca, setBusca] = useState("");
  const [lista, setLista] = useState([]);
  const disciplina = (() => {
  const salvas = localStorage.getItem("disciplinasMatriculadas")
  if (salvas) {
    return JSON.parse(salvas)
  }
  return []
})()
 const alunoId = 1
const navigate = useNavigate();


  function adicionarMateria(item) {
      const jaAdicionada = lista.find(
      (m) => m.dia === item.dia && m.horario === item.horario && m.turno === item.turno && m.vagas === item.vagas
    );
    if (jaAdicionada) {
      alert("Já existe uma matéria nesse horário e dia!");
      return;
    }
    setLista([...lista, item]);
  }

 

function salvar() {
  localStorage.setItem("disciplinasMatriculadas", JSON.stringify(lista));
   fetch(`URL_API/matriculas/${alunoId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        disciplinas: lista
      })
    })
      .then((res) => res.json())
      .then(() => {navigate("/dashboard")})
      .catch((err) => console.log(err));
  }


const aluno = {
  nome : "Matheus",
  sobrenome : "Silva",
  curso : "Medicina"
}

  const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  return (
    <>
      <Navbar />

      <h1>Matrícula</h1>

      <Container className="mt-4">
       <Row className="g-3">
       <Col md={6}>
        <Form.Control 
        type="text"
        value={`${aluno.nome} ${aluno.sobrenome} - ${aluno.curso} `}
        readOnly />
        
        </Col>
       
        <Col md={6}>
        <Form.Control
          type="text"
          placeholder="Matérias a cursar"
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
          }}
        />

        {busca &&disciplina
          .filter((disciplina) =>
            disciplina.nome.toLowerCase().includes(busca.toLowerCase()),
          )
          .map((disciplina, index) => (
           
            <div
             key={index}
             onClick={() => adicionarMateria(disciplina)}
             className="item-disciplina"
              >
               {disciplina.nome} [{disciplina.turno}-{disciplina.horario} ({disciplina.dia})({disciplina.vagas})]

            </div>
          ))}
     </Col>
     </Row>
     </Container>
      <h2 className="mt-4">Manhã</h2>
        <Table striped bordered hover responsive className="mt-4 text-center">
          <thead>
            <tr>
              <th>Horário/dia</th>
             <th>Segunda</th>
            <th>Terça</th>
            <th>Quarta</th>
            <th>Quinta</th>
            <th>Sexta</th>
            <th>Sábado</th>
            </tr>
          </thead>
          <tbody>
            {["A", "B", "C", "D", "E", "F"].map((horario) => (
              <tr key={horario}>
                <td>{horario}</td>
            {dias.map((dia) => {
                  const materia = lista.find(
                    (m) => m.dia === dia && m.horario === horario && m.turno === "Manhã",
                  );

                  return <td key={dia}>{materia ? materia.nome : ""}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </Table>
     
     <h2 className="mt-4">Tarde</h2>
     <Table striped bordered hover responsive className="mt-4 text-center">
  <thead>
    <tr>
      <th>Horário /dia</th>
      <th>Segunda</th>
      <th>Terça</th>
      <th>Quarta</th>
      <th>Quinta</th>
      <th>Sexta</th>
      <th>Sábado</th>
    </tr>
  </thead>

  <tbody>
    {["A", "B", "C", "D","E","F"].map((horario) => (
      <tr key={horario}>
        <td>{horario}</td>

     {dias.map((dia) =>{
      const materia = lista.find(
  (m) => m.dia === dia && m.horario === horario && m.turno === "Tarde"
        ) 
        return <td key={dia}>{materia ? materia.nome : ""}</td>
})}
      </tr>
    ))}
  </tbody>
</Table>

<h2 className="mt-4">Noite</h2>
<Table striped bordered hover responsive className="mt-4 text-center">
  <thead>
    <tr>
      <th>Horário / Dia</th>
      <th>Segunda</th>
      <th>Terça</th>
      <th>Quarta</th>
      <th>Quinta</th>
      <th>Sexta</th>
      <th>Sábado</th>
    </tr>
  </thead>

  <tbody>
    {["A", "B", "C", "D"].map((horario) => (
      <tr key={horario}>
        <td>{horario}</td>

       {dias.map((dia) => {
          const materia = lista.find(
               (m) => m.dia === dia && m.horario === horario && m.turno === "Noite"
          )              
         return <td key={dia}>{materia ? materia.nome : ""}</td>
})}
      </tr>
    ))}
  </tbody>
</Table>

<p>Os horários da manhã se referem ao seguinte: ( A: 07:30 às 08:20, B: 08:20 às 09:10, C: 09:30 às 10:20, D: 10:20 às 11:10, E: 11:20 às 12:10, F: 12:10 às 13:00 ).</p>
<p>Os horários da tarde se referem ao seguinte: ( A: 13:30 às 14:20, B: 14:20 às 15:10, C: 15:30 às 16:20, D: 16:20 às 17:10, E: 17:20 às 18:10, F: 18:10 às 19:00 ).</p>
<p>Os horários da noite se referem ao seguinte: ( A: 19:00 às 19:50, B: 19:50 às 20:40, C: 21:00 às 21:50, D: 21:50 às 22:40 ).</p>

      
        <Button onClick={salvar} className="mt-4">Salvar</Button>
     

      <footer className="mt-4">
        <p>Fundação Edson Queiroz © 2026. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}
export default Matricula;

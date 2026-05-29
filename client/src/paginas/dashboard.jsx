import Navbar from "../Componentes/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carrossel from "../Componentes/Carousel";
import Listateste from "../Componentes/Lista";
import Avisos from "../Componentes/Cardss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MeuAccordion from "../Componentes/Listaacorde";
import Accordion from "react-bootstrap/Accordion";
import { getMinhaMatricula, verificarToken } from "../services/api";
import "./dashboard.css";
import AccordionDisci from "../Componentes/AcordeDisci";
import CardExemplo from "../Componentes/Card2";
import Grades from "../Componentes/Grade"

function Dashboard() {
  const [disciplinasAluno, setDisciplinasAluno] = useState([]);

  const navigate = useNavigate();

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
    async function carregarMatricula() {
      try {
        const matricula = await getMinhaMatricula();
        if (matricula?.turmas) {
          const nomes = matricula.turmas.map(
            (turma) => ({
             nome: turma.disciplina?.nome || "Disciplina sem nome",
             professor: turma.professor?.nome || "Professor não informado",
             sala: turma.sala || "Sala não informada",
             dia: turma.dia || "Não informado",
             horario: turma.horario || "Não informado",
             turno : turma.turno || "Não informado"
        }));
          setDisciplinasAluno(nomes);
        } else {
          setDisciplinasAluno([]);
        }
      } catch (err) {
        console.log("Erro ao carregar disciplinas do aluno:", err);
      }
    }

    carregarMatricula();
  }, []);

  return (
    <>
      <Navbar />
      <Carrossel />
      <Avisos />
      <p className="desempenho">Desempenho</p>

      <Container fluid className="mt-3">
        <Row className="g-4 align-items-start">
          <Col md={6}>
          <div className="caixa-disciplinas">
          { disciplinasAluno.length > 0 ? (
              <AccordionDisci disciplinas={disciplinasAluno} /> ) : (
            <Listateste
              titulo="Disciplinas"
                 itens={
                ["Nenhuma disciplina matriculada"]            
                }
              />
              )}
              </div>
          </Col>

          <Col md={6}>
        <div className="w-100">
        <Grades disciplinas={disciplinasAluno || []} />
       </div>
          </Col>
        </Row>
      </Container>

      <Container fluid className="mt-3">
        <Row className="g-4 align-items-start">
          <Col md={6}>
            <Listateste
              titulo={<>
                <i className="bi bi-newspaper me-2"></i>
                 <span className="titulo-padrao">
                Saiba mais sobre todos os cursos disponíveis na Unifor!!
               </span>
                   </>
              }
              itens={[
                <a href="https://unifor.br/web/graduacao/todos-os-cursos?gad_source=1&gad_campaignid=23739118457&gbraid=0AAAAADRl9tu83oZMX84LBWYmZh7Mu7kP1&gclid=CjwKCAjw2rrQBhBuEiwAarLWHSPgunLt4arBr4G8BBeE88rMyKMKf_0ybPyj0QCzys9sTRdsGhYYqBoCNH8QAvD_BwE">Aqui você consegue ter acesso a todos os cursos. Clique já e descubra mais!!</a>
             
              ]}
            />
          
             
            <CardExemplo
             className="mt-3"
              titulo={<>
                <i className="bi bi-newspaper me-2"></i>
                 <span className="titulo-padrao">
                Orientações de matrícula.
                  </span>
                   </>
                 
              }

              itens={[
               "1) Primeiramente escolha as disciplinas obrigatórias.",
               "2) Depois selecione as optativas.",
               "3) Clique sobre um horário destacado na grade para visualizar informações detalhadas da disciplina, como sala, professor e período da aula.",
               "4) Finalize sua matrícula antes do prazo."
              ]}
            
              />
          </Col>
      
        
          <Col md={6}>
 <div className="horarios-box">

  <div className="horarios-titulo">
    <i className="bi bi-clock me-2"></i>
    Tradução dos horários
  </div>

  <div className="horarios-conteudo">

    <div className="horario-card">
      <span className="horario-badge">MAB</span>
      <span>07:30 às 09:10</span>
    </div>

    <div className="horario-card">
      <span className="horario-badge">MCD</span>
      <span>09:30 às 11:10</span>
    </div>

    <div className="horario-card">
      <span className="horario-badge">MEF</span>
      <span>11:20 às 13:00</span>
    </div>

    <div className="horario-card">
      <span className="horario-badge">TAB</span>
      <span>13:30 às 15:10</span>
    </div>

    <div className="horario-card">
      <span className="horario-badge">TCD</span>
      <span>15:30 às 17:10</span>
    </div>

    <div className="horario-card">
      <span className="horario-badge">TEF</span>
      <span>17:20 às 19:00</span>
    </div>

    <div className="horario-card">
      <span className="horario-badge">NAB</span>
      <span>19:00 às 20:40</span>
    </div>

     <div className="horario-card">
      <span className="horario-badge">NCD</span>
      <span>21:00 às 22:40</span>
    </div>

  </div>
</div>    
      
      
          </Col>
         </Row>
        </Container>
        <br />
 <div className="caixa-dicas">

  <div className="titulo-dicas">
    <i className="bi bi-info-circle me-2"></i>
    Mais informações.
  </div>

  <div className="conteudo-dicas">
  <p>
     Os horários da grade são organizados por turno e por letras.
    </p>
    <p>
     M = Manhã, T = Tarde e N = Noite.
    </p>
    <p>
   Os horários destacados indicam disciplinas matriculadas. Clique sobre eles para consultar detalhes da aula.
    </p>
 </div>

</div>
<br />
      <footer className="mt-3">
        <p className="rodape">Fundação Edson Queiroz © 2026. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}

export default Dashboard;
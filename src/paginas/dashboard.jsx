import Navbar from "./Componentes/Navbar";
import { useState } from "react";
import Carrossel from "./Componentes/Carousel";
import  Listateste from "./Componentes/Lista"
import Avisos from "./Componentes/Cardss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MeuAccordion from "./Componentes/Listaacorde";
import Accordion from 'react-bootstrap/Accordion';
import "./dashboard.css"

function Dashboard() {
const [ativo, setAtivo] = useState("0");
const [ativoBaixo, setAtivoBaixo] = useState("0");


const disciplinasAluno = (() => {
  const salvas = localStorage.getItem("disciplinasMatriculadas")
  if (salvas) {
    const lista = JSON.parse(salvas)
    return lista.map(d => d.nome)
  }
  return []
})


  return (
    <>
      <Navbar/>
     
     <Carrossel/>


     <Avisos/>

<p className="desempenho">Desempenho</p>

  <Container className="mt-5">
    <Row className="g-4 align-items-stretch">
     <Col md={8} className="d-flex">
     <Listateste   
       titulo = "Disciplinas"
       itens={disciplinasAluno}
     />
</Col>
<Col md={4} className="d-flex flex-column">
<Accordion activeKey={ativo}
  onSelect={(eventKey) => {
    if (eventKey !== null) {
      setAtivo(eventKey);
    }
  }}>
<MeuAccordion 
       eventKey="0"
        pauta="Torpedos"

        itens={[
          "Torpedo1",
          "Torpedo2",
          "Torpedo3",
          "Torpedo4"
        ]}
      />

      <MeuAccordion
      eventKey="1"
        pauta="Avisos"

        itens={[
          "A frequênica de Março da turma T164-63 está disponível para consulta",
          "A frequênica de Março da turma T175-73 está disponível para consulta",
          "A frequênica de Março da turma T194-69 está disponível para consulta",
          "A frequênica de Março da turma T123-23 está disponível para consulta"
        ]}
      />
      </Accordion>
     </Col>
     </Row>
</Container>

<Container className="mt-5">
    <Row className="g-4">
     <Col md={8}>
<Listateste 
     titulo = "Notícias"
     itens = {[
        "Unifor divulga relatório de Transparência e Igualdade Salarial de Mulheres e Homens - 2026.1",
        "Marketing in Ação 2026 debate os impactos da Creator Economy na Unifor",
        "Cerimônia do Trigo 2026.1 marca acolhida de novos alunos de Nutrição",
        "Da colaboração com Anitta à sala de aula: Unifor recebe Luis Matuto em masterclass de Design",
        "Edital oferece bolsa da Funcap para o Mestrado em Saúde Coletiva da Unifor",
        "Unifor abre inscrições para a Feira de Profissões 2026",
        "Unifor divulga resultado dos Editais de Iniciação Científica e Tecnológica 2025",
        "Unifor em Salamanca: Santander Top España 2026 com inscrições abertas",
        " ",
     ]}
     />
</Col>

<Col md={4}>
<Accordion activeKey={ativoBaixo}
  onSelect={(eventKey) => {
    if (eventKey !== null) {
      setAtivoBaixo(eventKey);
    }
  }}>
 <MeuAccordion
       eventKey="0"
        pauta="Agenda"

        itens={[
          "Aula de Desenv Plataformas Web (T242 - 13)",
          "Aula de Desenv Plataformas Web (T242 - 13)",
          "Aula de Desenv Plataformas Web (T242 - 13)",
          "Aula de Desenv Plataformas Web (T242 - 13)",
          "Aula de Desenv Plataformas Web (T242 - 13)",
          "Aula de Desenv Plataformas Web (T242 - 13)",
        ]}
      />
 <MeuAccordion
       eventKey="1"
        pauta="Calendário de Eventos"

        itens={[
          "01/05 Dia do trabalho - Feriado",
          "05/05 Data final para digitação e entrega de frequência do mês de Abril",
          "14/05 e 15/05 Feira de Profissões",
          "15/05 Data final para registro da Av2"
        ]}
      />
 <MeuAccordion
        eventKey="2"
        pauta="Grupo de Trabalho"

        itens={[
          "#SOUCCT 2025.1"
          
        ]}
      />
      <MeuAccordion
      eventKey="3"
        pauta="Pilares da Unifor"

        itens={[
          " Missão: Contribuir para o desenvolvimento socioeconômico, científico e cultural, por meio da formação de profissionais de excelência, da pesquisa e da extensão universitária.",
          " Visão: Ser uma das 10 melhores universidades particulares do Brasil até 2030.",
          "Valores:Buscamos o que é melhor para o aluno e focamos os nossos esforços objetivando a qualidade da sua aprendizagem e o seu encantamento em relação à sua experiência na Unifor;",
          "Ética:Agimos e comunicamos de acordo com os valores que norteiam uma conduta íntegra, respeitando as normas públicas e os regulamentos internos, de forma transparente;"
        ]}
      />
      </Accordion>
</Col>
</Row>
</Container>


      <footer>
        <p>Fundação Edson Queiroz © 2026. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}
export default Dashboard;

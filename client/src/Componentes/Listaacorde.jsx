import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import './Listaacorde.css'

function MeuAccordion({pauta,itens, eventKey}) {
  return (
  <div className='acorde'>
      <Accordion.Item eventKey={eventKey}>
       <Accordion.Header>
          {pauta}
        </Accordion.Header>
        <Accordion.Body className="scroll-area">
           {itens.map((item, index) => (
           typeof item === 'object' ? (
            <div key={index} className="chat-card">
              <div className="chat-princi">
                <span className="chat-prof">{item.professor}</span>
              </div>
              <div className="chat-disci">{item.disciplina}</div>
              <div className="chat-mensagem">{item.mensagem}</div>
            </div>
           ) : (
            <p key={index} className="item-texto">{item}</p>
           )

             
            ))}

         
        </Accordion.Body>

      </Accordion.Item>
</div>

  );
}

export default MeuAccordion;
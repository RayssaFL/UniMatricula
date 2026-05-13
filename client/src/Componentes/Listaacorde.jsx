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

          <ListGroup>
           {itens.map((item, index) => (
              <ListGroup.Item key={index}>
                {item}
              </ListGroup.Item>
            ))}

          </ListGroup>

        </Accordion.Body>

      </Accordion.Item>
</div>

  );
}

export default MeuAccordion;
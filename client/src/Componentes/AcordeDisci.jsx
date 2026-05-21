import Accordion from 'react-bootstrap/Accordion'
import ListGroup from 'react-bootstrap/ListGroup'
import './Lista.css'
import './AcordeDisci.css'


function AccordionDisci({disciplinas}) {
  return (
      <div className='h-100 w-100'>
      <div className="disci">
       <i className="bi bi-list-task me-2"></i>
        Disciplinas
      </div>
    <div className='acorde'>
    <Accordion>
  {disciplinas.map((disciplina, index) => (
    <Accordion.Item
      eventKey={index.toString()}
       key={index}
        >

      <Accordion.Header>
        {disciplina.nome}
       </Accordion.Header>
          <Accordion.Body>
            <ListGroup>

              <ListGroup.Item>
                <strong>Professor:</strong> {disciplina.professor}
              </ListGroup.Item>

              <ListGroup.Item>
                <strong>Sala:</strong> {disciplina.sala}
              </ListGroup.Item>

              <ListGroup.Item>
                <strong>Dia:</strong> {disciplina.dia}
              </ListGroup.Item>

              <ListGroup.Item>
                <strong>Horário:</strong> {disciplina.horario}
              </ListGroup.Item>

              <ListGroup.Item>
                <strong>Turno:</strong> {disciplina.turno}
              </ListGroup.Item>

             </ListGroup>
         </Accordion.Body>
      </Accordion.Item>

      ))}

    </Accordion>
    </div>
    </div>
  );
}

export default AccordionDisci;
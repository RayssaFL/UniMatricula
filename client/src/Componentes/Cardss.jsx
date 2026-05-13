import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './Cards.css'

function Avisos() {
  return (
   
    <CardGroup className ="cards">
      <Card >
       
        <Card.Body>
          <Card.Title>PMG</Card.Title>
          <Card.Text>
         
          </Card.Text>
        </Card.Body>
        <Card.Footer>
       
        </Card.Footer>
      </Card>
      <Card >
       
        <Card.Body>
          <Card.Title>Aprovações</Card.Title>
          <Card.Text>
         
          </Card.Text>
        </Card.Body>
        <Card.Footer>
      
        </Card.Footer>
      </Card>
      <Card >
    
        <Card.Body>
          <Card.Title>Conclusão</Card.Title>
          <Card.Text>
           
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          
        </Card.Footer>
      </Card>
      <Card>
       
        <Card.Body>
          <Card.Title>Assiduidade</Card.Title>
          <Card.Text>
         
          </Card.Text>
        </Card.Body>
        <Card.Footer>
      
        </Card.Footer>
      </Card>
  </CardGroup>
  );
}

export default Avisos;
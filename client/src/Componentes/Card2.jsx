import Card from 'react-bootstrap/Card';

function CardExemplo({titulo, itens}) {
  return (
    <>
      <Card border="primary" className="w-100 shadow-sm mt-3">
        <Card.Header>{titulo}</Card.Header>
        <Card.Body>
         {itens.map((item, index) => (
          <Card.Text key={index}>
           {item}
          </Card.Text>
                ))}
        </Card.Body>
      </Card>
      
   
    </>
  );
}

export default CardExemplo;
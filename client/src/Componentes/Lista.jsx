import ListGroup from 'react-bootstrap/ListGroup';
import "./Lista.css"

function Listateste ({titulo,itens}) {
  return (
   <div className="h-100 w-100">
    <ListGroup className="h-100">
   <div className='listas'>
     <ListGroup.Item className="titulo-azul">
          {titulo}
        </ListGroup.Item>

     

      {Array.isArray(itens) && itens.map((item, index) => (
        <ListGroup.Item key={index}>
          {item}
        </ListGroup.Item>

      ))}
 </div>
    </ListGroup>
    </div>

  );
}

export default Listateste ;
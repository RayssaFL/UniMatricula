import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './Cards.css';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Avisos() {
  return (
    <CardGroup className="cards">

      <Card>
        <Card.Body className="text-center">
          <Card.Title>PMG</Card.Title>

          <div className="progresso-card">
            <CircularProgressbar
              value={40}
              text="40%"
            />
          </div>

        </Card.Body>
      </Card>

      <Card>
        <Card.Body className="text-center">
          <Card.Title>Aprovações</Card.Title>

          <div className="progresso-card">
            <CircularProgressbar
              value={50}
              text="50%"
            />
          </div>

        </Card.Body>
      </Card>

      <Card>
        <Card.Body className="text-center">
          <Card.Title>Conclusão</Card.Title>

          <div className="progresso-card">
            <CircularProgressbar
              value={20}
              text="20%"
            />
          </div>

        </Card.Body>
      </Card>

      <Card>
        <Card.Body className="text-center">
          <Card.Title>Assiduidade</Card.Title>

          <div className="progresso-card">
            <CircularProgressbar
              value={90}
              text="90%"
            />
          </div>

        </Card.Body>
      </Card>

    </CardGroup>
  );
}

export default Avisos;
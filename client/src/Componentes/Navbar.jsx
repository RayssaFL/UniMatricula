import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";
import logo from '../assets/logodash.png';
import './Navbar.css';

function BasicExample() {

  const navigate = useNavigate();
  function sair() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <Navbar expand="lg" className='proprio-navbar' variant="dark">
      <Container>
        <Navbar.Brand href="/dashboard">
          <img
            src={logo}
            alt='logo'
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 align-items-center gap-4">
            <Nav.Link href="/dashboard">
              Início
            </Nav.Link>
           
            <NavDropdown title="Matrícula" id="matricula-dropdown">
              <NavDropdown.Item href="/matricula">
                Matrícula
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Orientações de matrícula
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Disciplinas em curso
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                Aptas a cursar
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.5">
                Matrícula especial
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <div className="ms-auto">
             <Nav.Link onClick={sair}>
             Sair
            </Nav.Link>
            </div>
         </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
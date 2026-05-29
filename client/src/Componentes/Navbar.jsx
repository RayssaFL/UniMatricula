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
          <Nav className="me-auto gap-4">
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
              <NavDropdown.Divider />
            </NavDropdown>
            <NavDropdown title="Perfil" id="perfil-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Perfil
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Atualizar
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={sair}>
                Sair
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
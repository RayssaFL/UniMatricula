import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import './inicio.css'
import logo from '../assets/novologin.png';
import fundo from '../assets/fundo2.png'
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Button from "react-bootstrap/Button";

function Inicio() {
    const [matricula, setMatricula] = useState('')
    const [senha, setSenha] = useState('')
    const [carregando, setCarregando] = useState(false);

    const navigate = useNavigate()
    function Ler(e){
        e.preventDefault()
        console.log(matricula)
         console.log(senha)
         navigate("/dashboard")
    }
  
function entrar() {
  setCarregando(true);
  setTimeout(() => {
 navigate("/dashboard");
 }, 2000);

}

    return (
    <>
    <div className='fundo' style={{ backgroundImage : `url(${fundo})`}}>
    <div className='todo'>
       <img src={logo} alt="" className='imagem'/>  
        <div className='titulos'>
<h1>Acesso ao Unifor online</h1>
<h2>Aqui você encontra os serviços digitais da Universidade de Fortaleza.</h2>
</div>
<form onSubmit={Ler} className="container">
    <Form.Group className="mb-3"
     controlId="exampleForm.ControlInput1">
      <div className="mb-3">
<Form.Label>Matrícula</Form.Label>
<Form.Control type="text"
 placeholder="Digite sua matrícula aqui" 
 value={matricula}
 onChange={(e) => {setMatricula(e.target.value)}}
 />
</div>
</Form.Group>

 <Form.Group className="mb-3" 
 controlId="exampleForm.ControlTextarea1">
<Form.Label className="form-label label">Senha</Form.Label>
<Form.Control type="password" 
 className="form-control"
 id="senha"
placeholder="Digite sua senha aqui" 
value={senha}
onChange={(e) => {setSenha(e.target.value)}}
/>

<p><a href="#">Esqueceu a senha?</a></p>

<Button onClick={entrar} disabled={carregando} className="btn btn-primary w-100"> {carregando ?(  <Spinner animation="border" size="sm" /> ) : ( "Acessar")}</Button>
<p ><a href="https://unifor.br/">Voltar para o portal Unifor</a></p>
</Form.Group>
</form>
</div>
</div>
    </>
 )

}

export default Inicio;
import { useState } from 'react'
import { useNavigate } from "react-router-dom"

function Inicio() {
    const [matricula, setMatricula] = useState('')
    const [senha, setSenha] = useState('')
    
    const navigate = useNavigate()
    function Ler(e){
        e.preventDefault()
        console.log(matricula)
         console.log(senha)
         navigate("/dashboard")
    }
  
    return (
    <>
      <img src="" alt=""/>  
<h1>Unifor online</h1>
<h2>Tudo o que você precisa da Universidade de Fortaleza, em um só lugar.</h2>
<form onSubmit={Ler}>
<label>Matrícula</label>
<input type="text"
 placeholder="Digite sua matrícula aqui" 
 value={matricula}
 onChange={(e) => {setMatricula(e.target.value)}}
 />

<label>Senha</label>
<input type="password" 
placeholder="Digite sua senha aqui" 
value={senha}
onChange={(e) => {setSenha(e.target.value)}}
/>

<p><a href="#">Esqueceu a senha?</a></p>

<button type="submit">Acessar</button>
<p><a href="https://unifor.br/">Voltar para o portal Unifor</a></p>
</form>

    </>
 )

}

export default Inicio
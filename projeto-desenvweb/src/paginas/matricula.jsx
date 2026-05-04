import { useState, useEffect } from 'react'
import Navbar from "./Componentes/Navbar"

function Matricula(){

const [busca,setBusca] = useState('')
const [lista, setLista] = useState([])
const [disciplina, setDisciplina] = useState([])

function adicionarMateria(item){

   setLista([...lista, item])
  }

    useEffect(() => {
    fetch("URL_123")
      .then(res => res.json())
      .then(data => setDisciplina(data))
      .catch(err => console.log(err))
  }, [])
return(
<>
<Navbar/>

<h1>Matrícula</h1>

<div>
    <input type="text" placeholder="dados"/>
<input type="text" 
placeholder="Matérias a cursar"
value={busca}
onChange={(e) => {setBusca(e.target.value)}}
/>

 {disciplina
        .filter(disciplina => disciplina.nome.toLowerCase().includes(busca.toLowerCase()))
        .map((disciplina, index) => (
          <button key={index} onClick={() => adicionarMateria(disciplina)}>
            {disciplina.nome} -({disciplina.dia} ({disciplina.horario}))
          </button>
        ))}
</div>
<main>
    
 <table>
<thead>
    <tr>
     <th>Horário
        /dia</th>
    <th>Segunda</th>
    <th>Terça</th>
    <th>Quarta</th>
    <th>Quinta</th>
    <th>Sexta</th>
    <th>Sábado</th>
    </tr>
</thead>
<tbody>
     {["A","B","C","D","E","F"].map(horario => (
      <tr key={horario}>
        <td>{horario}</td>

        {["Segunda","Terça","Quarta","Quinta","Sexta","Sábado"].map(dia => {

          const materia = lista.find(
            m => m.dia === dia && m.horario === horario
          )

          return (
            <td key={dia}>
              {materia ? materia.nome : ""}
            </td>
          )
        })}
      </tr>
    ))}

</tbody>


</table>

</main>

<form action=""><button type="submit">Salvar</button></form>


<footer>
   <p>Fundação Edson Queiroz © 2026. Todos os direitos reservados.</p>
</footer>

</>
)
}
export default Matricula;
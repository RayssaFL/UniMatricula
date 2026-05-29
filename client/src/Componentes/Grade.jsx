import "./Grade.css";

function Grades({ disciplinas=[] }) {

  const dias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const diascomp = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

 const turnos = [
    { nome: "Manhã", horarios: ["A", "B", "C", "D", "E", "F"] },
    { nome: "Tarde", horarios: ["A", "B", "C", "D", "E", "F"] },
    { nome: "Noite", horarios: ["A", "B", "C", "D"] },
  ]

        const mapaHorarios = {
      "AB": ["A", "B"],
      "CD": ["C", "D"],
      "EF": ["E", "F"],
    }

   function aulas(dia, horario,turno) {
    return disciplinas.some((disciplina) => {
   const horarioLimpo = disciplina.horario ?.replace("M", "") ?.replace("T", "") ?.replace("N", "");
    const letrasDoHorario = mapaHorarios[horarioLimpo] || [];
     return ( disciplina.dia === dia && disciplina.turno === turno && letrasDoHorario.includes(horario)
    )
  })
}
 
  function getNomeDisciplina(dia, horario, turno) {
  const disc = disciplinas.find((disciplina) => {
   const horarioLimpo = disciplina.horario ?.replace("M", "") ?.replace("T", "") ?.replace("N", ""); 
   const letrasDoHorario = mapaHorarios[horarioLimpo] || []; 
   return ( disciplina.dia === dia && disciplina.turno === turno && letrasDoHorario.includes(horario)
      )
    })
    return disc?.nome || ""
  }

 

  return (
    <div className="grade-card">

      <h2 className="titulo-grade">
        Grade de horários
      </h2>
  <div className="grade-scroll">
    
    {turnos.map((turno) => (
    <div key={turno.nome} className="turno-bloco">
    <div className="turno-titulo">{turno.nome}</div>
      <div className="grade-grid">

        <div></div>

        {dias.map((dia) => (
          <div key={dia} className="dia-header">
            {dia}
          </div>
        ))}

        {turno.horarios.map((horario) => (
          <>
            <div key={horario} className="horario-label">
              {horario}
            </div>

            {diascomp.map((dia) => (
              <div key={`${dia}-${horario}`} className="celula">

                {aulas(dia, horario,turno.nome) ? (
                  <div className="bolinha ativa"  title={getNomeDisciplina(dia, horario, turno.nome)}></div>
                ) : (
                  <div className="bolinha"></div>
                )}

              </div>
            ))}
          </>
        ))}

      </div>
    </div>
         
))}
  </div>
    </div>

  )
}

export default Grades;
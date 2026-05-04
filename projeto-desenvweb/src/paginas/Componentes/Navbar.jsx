import { Link } from "react-router-dom"

function Navbar() {
  return (
    <header>
      <nav>

        <Link to="/">
          <img src="" alt="" />
        </Link>

        <ul>
          <li><Link to="#">Pessoal</Link></li>
          <li><Link to="#">Rendimento</Link></li>
          <li><Link to="/matricula">Matrícula</Link></li>
          <li><Link to="#">Financeiro</Link></li>
          <li><Link to="#">Biblioteca</Link></li>
          <li><Link to="#">Serviços</Link></li>
          <li><Link to="#">Educação Virtual</Link></li>
          <li><Link to="#">Perfil</Link></li>
        </ul>

      </nav>
    </header>
  )
}

export default Navbar
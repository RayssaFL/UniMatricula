import {Routes, Route} from "react-router-dom";
import Inicio from "./paginas/inicio.jsx";
import Dashboard from "./paginas/dashboard.jsx";
import Matricula from "./paginas/matricula.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import "./index.css"

function App() {
  return <>

   <Routes>

 <Route path = "/" element = {<Inicio/>}/>
 <Route path = "/dashboard" element = {<Dashboard/>}/>
 <Route path = "/matricula" element = {<Matricula/>}/>

   </Routes>

  </>;
}

export default App;

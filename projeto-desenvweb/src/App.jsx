import { BrowserRouter, Routes, Route} from "react-router-dom";
import Inicio from "./paginas/inicio.jsx";
import Dashboard from "./paginas/dashboard.jsx";
import Matricula from "./paginas/matricula.jsx";
import "./App.css";

function App() {
  return <>
 <BrowserRouter>
   <Routes>

 <Route path = "/" element = {<Inicio/>}/>
 <Route path = "/dashboard" element = {<Dashboard/>}/>
 <Route path = "/matricula" element = {<Matricula/>}/>

   </Routes>
 </BrowserRouter>
  </>;
}

export default App;

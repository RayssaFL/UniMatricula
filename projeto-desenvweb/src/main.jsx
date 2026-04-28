import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Inicio from "./paginas/inicio.jsx";
import Dashboard from "./paginas/dashboard.jsx";
import Matricula from "./paginas/matricula.jsx";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
     <BrowserRouter>
    <App />
     </BrowserRouter>
  </StrictMode>,
);

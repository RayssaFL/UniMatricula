import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App.jsx";
import "./App.css"
import "./index.css"
import { BrowserRouter } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css'

createRoot(document.getElementById("root")).render(
  <StrictMode>
     <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
);

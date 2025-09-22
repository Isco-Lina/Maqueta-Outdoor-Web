import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/main.css";

// Bootstrap (CSS + JS necesario para Navbar y componentes como Collapse/Modal)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Punto de entrada de la app React
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* BrowserRouter habilita la navegación SPA con React Router */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

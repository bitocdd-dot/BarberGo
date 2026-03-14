import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home.jsx";
import CadastroBarbeiro from "./pages/cadastrobarbeiro.jsx";
import Mapa from "./pages/mapa.jsx";
import PerfilBarbeiro from "./pages/perfilbarbeiro.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastrobarbeiro" element={<CadastroBarbeiro />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/perfilbarbeiro" element={<PerfilBarbeiro />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

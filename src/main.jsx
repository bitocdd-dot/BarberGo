import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// IMPORTS CORRIGIDOS
import Home from "./pages/Home.jsx";
import CadastroBarbeiro from "./pages/CadastroBarbeiro.jsx";
import Mapa from "./pages/Mapa.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CadastroBarbeiro" element={<CadastroBarbeiro />} />
        <Route path="/Mapa" element={<Mapa />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

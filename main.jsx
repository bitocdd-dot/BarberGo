import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import CadastroBarbeiro from './pages/cadastrobarbeiro.jsx';
import PerfilBarbeiro from './pages/perfilbarbeiro.jsx';
import Mapa from './pages/mapa.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      {/* Página inicial do app */}
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cadastrobarbeiro" element={<CadastroBarbeiro />} />
      <Route path="/perfilbarbeiro" element={<PerfilBarbeiro />} />
      <Route path="/mapa" element={<Mapa />} />
    </Routes>
  </BrowserRouter>
);
